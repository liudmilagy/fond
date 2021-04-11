package ru.gly.fond.service;

import ru.gly.fond.model.ClsProductEntity;
import ru.gly.fond.dto.ProductLineDto;

import java.util.List;

public interface ClsProductService {
    List<ProductLineDto> getProductLineData();
    List<ClsProductEntity> getProductDataForCalculator();
}
