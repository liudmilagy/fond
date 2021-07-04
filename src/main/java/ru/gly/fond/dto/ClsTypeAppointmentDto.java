package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ClsTypeAppointmentDto {

    private Long id;
    private String name;
    private String code;
    private String description;
    private Boolean isDeleted;
    private String attachmentPath;

}
