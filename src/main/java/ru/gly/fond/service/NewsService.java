package ru.gly.fond.service;

import org.springframework.data.domain.Page;
import ru.gly.fond.dto.NewsDto;

import java.util.List;

public interface NewsService {

    List<NewsDto> get4LastNews();
    Page<NewsDto> findNews(int page, int size);
}
