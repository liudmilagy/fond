package ru.gly.fond.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.model.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@Slf4j
public class ViewController extends SuperController {

    @GetMapping("/about_fond")
    public String viewAboutFond(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "about_fond_view";
    }

    @GetMapping("/about_fond_info")
    public @ResponseBody
    String getAboutFondHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ABOUT_FOND.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/about_fond_files")
    public @ResponseBody
    List<RegTabFile> getAboutFondFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ABOUT_FOND.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }
}
