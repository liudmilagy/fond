package ru.gly.fond.service;

import org.springframework.data.domain.Page;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.ClsNews;

import java.util.List;

public interface NewsService {

    List<NewsMainPage> get4LastNews();
    Page<NewsMainPage> findNews(int page, int size);
}
