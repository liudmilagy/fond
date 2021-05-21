package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.dto.NewsDto;
import ru.gly.fond.model.ClsNews;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.RegNewsFile;
import ru.gly.fond.model.RegProductFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Controller
public class NewsController extends SuperController {

    @GetMapping("/news_list")
    public String viewNewsist(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "news_list_view";
    }

    @GetMapping("/news_list/news")
    public String viewNews(@RequestParam(value = "hash_id") String hashId, Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());
        model.addAttribute("hash_id", hashId);
        return "news_view";
    }

    @GetMapping("/news_main")
    public @ResponseBody List<NewsDto> get4LastNews() {
        List<NewsDto> list = newsService.get4LastNews();
        return list;
    }

    @GetMapping("/news_list_pager")
    public @ResponseBody
    Map<String, Object> getNewsList(HttpSession session, @RequestParam(value = "start", required = false) Integer start,
                                       @RequestParam(value = "count", required = false) Integer count) {
        int page = start == null ? 0 : start / 10;
        int size = count == null ? 10 : count;
        Map<String, Object> result = new HashMap<>();
        Page<NewsDto> templates = newsService.findNews(page, size);

        result.put("data", templates.getContent());
        result.put("pos", (long) page * size);
        result.put("total_count", templates.getTotalElements());
        return result;
    }

    @RequestMapping(
            value = {"/news_list/news_dto", "/news_dto"},
            method = RequestMethod.GET
    )
    public @ResponseBody
    NewsDto getNews(@RequestParam("hash_id") String hashId) {
        ClsNews news = clsNewsRepo.findByHashId(hashId).orElse(null);
        NewsDto newsDto = null;
        if (news != null) {
            RegNewsFile imgCover = null;
            if (news.getIdImgCover() != null) {
                imgCover = regNewsFileRepo.findById(news.getIdImgCover()).orElse(null);
            }
            newsDto = NewsDto.builder()
                    .id(news.getId())
                    .heading(news.getHeading())
                    .hashId(news.getHashId())
                    .startTime(news.getStartTime().toString())
                    .attachmentPath((imgCover != null) ? imgCover.getAttachmentPath() : null)
                    .htmlText(news.getHtmlText())
                    .build();
        }
        return  newsDto;
    }

    @RequestMapping(
            value = {"news_files/{hash_id}", "/news_list/news_files/{hash_id}", "/news_list/cls_news/news_files{hash_id}"},
            method = RequestMethod.GET
    )
    public @ResponseBody
    List<RegNewsFile> getNewsFiles(@PathVariable("hash_id") String hashId) {
        ClsNews news = clsNewsRepo.findByHashId(hashId).orElse(null);
        List<RegNewsFile> newsFiles = regNewsFileRepo.findRegNewsFileByNews_IdAndIsDeletedAndIsHidden(news.getId(), false, false);
        return newsFiles;
    }
}
