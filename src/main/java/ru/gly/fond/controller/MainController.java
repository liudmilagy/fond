package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


import javax.servlet.http.HttpSession;

@Log4j2
@Controller
public class MainController extends SuperController {

    @GetMapping("/")
    public String mainView(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "index";
    }
}
