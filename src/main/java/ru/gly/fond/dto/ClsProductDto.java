package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ClsProductDto {

    private Long            id;
    private String          name;
    private Integer         limitation;
    private Boolean         isHidden;

    private Long            idWithDeposit;
    private Integer         minAmountWithDeposit;
    private Integer         maxAmountWithDeposit;
    private Float           interestRateWithDeposit;
    private Boolean         hasKeyRateWithDeposit;
    private Float           coefKeyRateWithDeposit;

    private Long            idWithoutDeposit;
    private Integer         minAmountWithoutDeposit;
    private Integer         maxAmountWithoutDeposit;
    private Float           interestRateWithoutDeposit;
    private Boolean         hasKeyRateWithoutDeposit;
    private Float           coefKeyRateWithoutDeposit;

}
