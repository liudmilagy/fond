package ru.gly.fond.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.model.GeneralTable;

@Controller
@Slf4j
public class FondIconController extends SuperController {

    @RequestMapping(
            value = {"/fond_icon","/news_list/fond_icon", "/product_list/fond_icon", "/product_list/product/fond_icon"},
            method = RequestMethod.GET
    )
    public @ResponseBody
    String getFondIconPath() {
        GeneralTable gt = generalTableRepo.findByCode("FOND_ICON_PATH");
        return gt.getStringValue();
    }

    @RequestMapping(
            value = {"/business_icon","/news_list/business_icon", "/product_list/business_icon",  "/product_list/product/business_icon"},
            method = RequestMethod.GET
    )
    public @ResponseBody
    String getBusinessIconPath() {
        GeneralTable gt = generalTableRepo.findByCode("BUSINESS_ICON_PATH");
        return gt.getStringValue();
    }
}
