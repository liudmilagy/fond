package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.ClsProductEntity;
import ru.gly.fond.dto.ProductLineDto;
import ru.gly.fond.model.RegProductFile;

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

    @GetMapping("/product_line_short")
    public @ResponseBody
    List<ClsProduct> getProductListShort() {
        List<ClsProduct> list = clsProductRepo.findAllByIsHidden(false);
        return list;
    }

    @GetMapping("/product_list_for_calculator")
    public @ResponseBody List<ClsProductEntity> getProductDataForCalculator(){
        List<ClsProductEntity> list = clsProductService.getProductDataForCalculator();
        return list;
    }

    @GetMapping("/product_files/{id_product}")
    public @ResponseBody List<RegProductFile> getRegProductFiles(@PathVariable("id_product") Long productId) {
        if (productId != -1) {
            ClsProduct product = clsProductRepo.findById(productId).orElse(null);
            List<RegProductFile> list = regProductFileRepo.findRegProductFilesByProductAndIsDeleted(product, false).orElse(null);
            return list;
        } else
            return null;
    }
}
