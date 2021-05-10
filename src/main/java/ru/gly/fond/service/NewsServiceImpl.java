package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.NewsDto;
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
    public List<NewsDto> get4LastNews() {
        List<ClsNews> list = clsNewsRepo.find4LastNews(new Timestamp(System.currentTimeMillis()));
        DateFormat df = new SimpleDateFormat("dd.MM.yyy");
        List<NewsDto> news4 = list.stream()
                                    .map(ctr -> NewsDto.builder()
                                                .id(ctr.getId())
                                                .heading(ctr.getHeading())
                                                .startTime(df.format(ctr.getStartTime()))
//                                                .imgCover(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null))
                                                .hashId(ctr.getHashId())
                                                .attachmentPath(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getAttachmentPath() + regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getFileExtension())
                                                .build())
                                    .collect(Collectors.toList());

        return news4;
    }

    @Override
    public Page<NewsDto> findNews(int page, int size) {
        List<ClsNews> list = clsNewsRepo.findNews(new Timestamp(System.currentTimeMillis())).stream().collect(Collectors.toList());
        DateFormat df = new SimpleDateFormat("dd.MM.yyy");

        List<NewsDto> newsList = list.stream()
                                        .map(ctr -> NewsDto.builder()
                                                    .id(ctr.getId())
                                                    .heading(ctr.getHeading())
                                                    .startTime(df.format(ctr.getStartTime()))
                                                    .hashId(ctr.getHashId())
                                                    .attachmentPath(regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getAttachmentPath() + regNewsFileRepo.findById(ctr.getIdImgCover()).orElse(null).getFileExtension())
                                                    .build())
                                        .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(page, size);
        long start = pageable.getOffset();
        long end = (start + pageable.getPageSize()) > newsList.size() ? newsList.size() : (start + pageable.getPageSize());

        Page<NewsDto> pages = new PageImpl<NewsDto>(newsList.subList((int) start, (int) end), pageable, newsList.size());
        return pages;
    }
}
