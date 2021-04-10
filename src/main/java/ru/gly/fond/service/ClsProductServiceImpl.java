package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.ProductLineDto;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.ClsProvision;
import ru.gly.fond.model.ProvisionCodes;
import ru.gly.fond.model.RegProductProvision;
import ru.gly.fond.repository.RegProductProvisionRepo;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
                                        .build();
                    RegProductProvision productProvision = productProvisionMap.get(ctr);

                    if (productProvision != null) {
                        el.setAmount("от " + productProvision.getMinAmount() + " до " + productProvision.getMaxAmount() + " руб.");
                    }
                    return el;
                })
                .collect(Collectors.toList());

        return productLineList;
    }
}
