package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.gly.fond.model.*;
import ru.gly.fond.dto.ProductLineDto;
import ru.gly.fond.repository.ClsProvisionRepo;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ClsProductServiceImpl extends SuperServiceImpl implements ClsProductService {
    @Override
    public List<ProductLineDto> getProductLineData() {
        List<ClsProduct> productList = clsProductRepo.findAllByIsHidden(false);

        List<RegProductProvision> productProvisionsWithMaxAmount = regProductProvisionRepo.getProductProvisionWithMaxAmount();
        Map<ClsProduct, RegProductProvision> productProvisionMap = productProvisionsWithMaxAmount.stream()
                .collect(Collectors.toMap(RegProductProvision::getProduct, productProvision -> productProvision, (productProvision1, productProvision2) -> productProvision1));

        List<ProductLineDto> productLineList = productList.stream()
                .map(ctr -> {
                    ProductLineDto el =  ProductLineDto.builder()
                                        .id(ctr.getId())
                                        .name(ctr.getName())
                                        .time("до " + ctr.getLimitation() + " месяцев")
                                        .htmlText(ctr.getHtmlText())
                                        .build();
                    RegProductProvision productProvision = productProvisionMap.get(ctr);

                    if (productProvision != null) {
                        el.setAmount("от " + withLargeIntegers(productProvision.getMinAmount()) + " до " + withLargeIntegers(productProvision.getMaxAmount()) + " руб.");
                    }
                    return el;
                })
                .collect(Collectors.toList());

        return productLineList;
    }

    @Override
    public List<ClsProductEntity> getProductDataForCalculator() {
        ClsProvision provisionWithDeposit = clsProvisionRepo.findByCode(ProvisionCodes.WITH_DEPOSIT.getValue());
        ClsProvision provisionWithoutDeposit = clsProvisionRepo.findByCode(ProvisionCodes.WITHOUT_DEPOSIT.getValue());
        List<ClsProductEntity> list = clsProductEntityRepo.getProductsForCalculator(provisionWithDeposit.getId(), provisionWithoutDeposit.getId());
        return list;
    }
}
