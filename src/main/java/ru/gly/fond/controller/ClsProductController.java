package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.model.ClsProductEntity;
import ru.gly.fond.dto.ProductLineDto;

import java.util.List;
import java.util.stream.Collectors;


@Log4j2
@Controller
public class ClsProductController extends SuperController {
    @GetMapping("/product_line")
    public @ResponseBody
    List<ProductLineDto> getProductList() {
        List<ProductLineDto> list = clsProductService.getProductLineData();
        return list;
    }

    @GetMapping("/product_list_for_calculator")
    public @ResponseBody List<ClsProductEntity> getProductDataForCalculator(){
        List<ClsProductEntity> list = clsProductService.getProductDataForCalculator();
        return list;
    }
}
