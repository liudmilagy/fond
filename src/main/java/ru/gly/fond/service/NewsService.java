package ru.gly.fond.service;

import ru.gly.fond.dto.NewsMainPage;

import java.util.List;

public interface NewsService {

    List<NewsMainPage> get4LastNews();
}
