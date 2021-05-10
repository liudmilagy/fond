package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.ClsNews;
import ru.gly.fond.model.RegNewsFile;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Controller
public class NewsController extends SuperController {

    @GetMapping("/news")
    public String viewProductList(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "news_list_view";
    }

    @GetMapping("/news_main")
    public @ResponseBody List<NewsMainPage> get4LastNews() {
        List<NewsMainPage> list = newsService.get4LastNews();
        return list;
    }

    @GetMapping("/news_list_pager")
    public @ResponseBody
    Map<String, Object> getNewsList(HttpSession session, @RequestParam(value = "start", required = false) Integer start,
                                       @RequestParam(value = "count", required = false) Integer count) {
        int page = start == null ? 0 : start / 10;
        int size = count == null ? 10 : count;
        Map<String, Object> result = new HashMap<>();
        Page<NewsMainPage> templates = newsService.findNews(page, size);

        result.put("data", templates.getContent());
        result.put("pos", (long) page * size);
        result.put("total_count", templates.getTotalElements());
        return result;
    }
}
