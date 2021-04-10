package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.dto.ProductLineDto;

import java.util.List;


@Log4j2
@Controller
public class ClsProductController extends SuperController {
    @GetMapping("/product_line")
    public @ResponseBody
    List<ProductLineDto> getProductList() {
        List<ProductLineDto> list = clsProductService.getProductLineData();
        return list;
    }
}
