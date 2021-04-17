package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gly.fond.model.ClsProduct;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProductLineDto {

    private Long            id;
    private String          name;
    private String          time;
    private String          amount;
    private String          htmlText;

}
