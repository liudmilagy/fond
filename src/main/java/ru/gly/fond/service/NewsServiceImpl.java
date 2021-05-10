package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.ClsNews;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NewsServiceImpl extends SuperServiceImpl implements NewsService  {

    @Override
    public List<NewsMainPage> get4LastNews() {
        List<ClsNews> list = clsNewsRepo.find4LastNews();
        DateFormat df = new SimpleDateFormat("dd.MM.yyy");
        List<NewsMainPage> news4 = list.stream()
                                    .map(ctr -> NewsMainPage.builder()
                                                .id(ctr.getId())
                                                .heading(ctr.getHeading())
                                                .startTime(df.format(ctr.getStartTime()))
//                                                .imgCover(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null))
                                                .attachmentPath(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getAttachmentPath() + regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getFileExtension())
                                                .build())
                                    .collect(Collectors.toList());

        return news4;
    }

    @Override
    public Page<NewsMainPage> findNews(int page, int size) {
        List<ClsNews> list = clsNewsRepo.findNews(new Timestamp(System.currentTimeMillis())).stream().collect(Collectors.toList());
        DateFormat df = new SimpleDateFormat("dd.MM.yyy");

        List<NewsMainPage> newsList = list.stream()
                                        .map(ctr -> NewsMainPage.builder()
                                                    .id(ctr.getId())
                                                    .heading(ctr.getHeading())
                                                    .startTime(df.format(ctr.getStartTime()))
                                                    .attachmentPath(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getAttachmentPath() + regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getFileExtension())
                                                    .build())
                                        .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(page, size);
        long start = pageable.getOffset();
        long end = (start + pageable.getPageSize()) > newsList.size() ? newsList.size() : (start + pageable.getPageSize());

        Page<NewsMainPage> pages = new PageImpl<NewsMainPage>(newsList.subList((int) start, (int) end), pageable, newsList.size());
        return pages;
    }
}
