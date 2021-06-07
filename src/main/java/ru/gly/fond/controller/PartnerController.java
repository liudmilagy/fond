package ru.gly.fond.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.dto.PartnerDto;

import java.util.List;

@Controller
@Slf4j
public class PartnerController extends SuperController{
    @GetMapping("/partners_main")
    public @ResponseBody List<PartnerDto> getAllPartners() {
        List<PartnerDto> list = partnerService.getAllPartners();
        return list;
    }
}
