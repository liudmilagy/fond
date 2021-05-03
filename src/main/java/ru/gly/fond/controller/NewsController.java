package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.RegNewsFile;

import java.util.List;

@Log4j2
@Controller
public class NewsController extends SuperController {

    @GetMapping("/news_main")
    public @ResponseBody List<NewsMainPage> get4LastNews() {
        List<NewsMainPage> list = newsService.get4LastNews();
        return list;
    }
}
