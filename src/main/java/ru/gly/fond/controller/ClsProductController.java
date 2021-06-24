package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.ClsProductEntity;
import ru.gly.fond.dto.ProductLineDto;
import ru.gly.fond.model.RegProductFile;

import javax.servlet.http.HttpSession;
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

    @GetMapping("/product_list/product/product_files/{id_product}")
    public @ResponseBody List<RegProductFile> getRegProductFiles(@PathVariable("id_product") Long productId) {
        if (productId != -1) {
            ClsProduct product = clsProductRepo.findById(productId).orElse(null);
            List<RegProductFile> list = regProductFileRepo.findRegProductFilesByProductAndIsDeleted(product, false).orElse(null);
            return list;
        } else
            return null;
    }

    @GetMapping("/product_list")
    public String viewProductList(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "product_list_view";
    }

    @GetMapping("/product_list/product/{id_product}")
    public String viewProduct(@PathVariable("id_product") Long productId, Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());
        model.addAttribute("product_id", productId);
        return "product_view";
    }

    @GetMapping("/product_list/product/cls_product")
    public @ResponseBody ClsProduct getProduct(@RequestParam("productId") Long productId) {
        return clsProductRepo.findById(productId).orElse(null);
    }

    @GetMapping("/get_key_rate")
    public @ResponseBody Float getKeyRate() {
        return generalTableRepo.findByCode("KEY_RATE").getFloatValue();
    }
}
