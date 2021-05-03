package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.ClsNews;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
}
