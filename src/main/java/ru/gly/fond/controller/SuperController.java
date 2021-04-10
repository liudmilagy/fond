package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ru.gly.fond.config.ApplicationConstants;
import ru.gly.fond.service.ClsProductService;

@Log4j2
@Controller
public class SuperController {

    @Autowired
    protected ApplicationConstants applicationConstants;

    @Autowired
    protected ClsProductService clsProductService;

}
