package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class PartnerDto {
    private Long id;
    private String name;
    private String logoPath;
    private String url;
}
