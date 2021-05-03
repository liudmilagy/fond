package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gly.fond.model.RegNewsFile;

import java.util.Date;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class NewsMainPage {
    private Long id;
    private String heading;
    private String startTime;
//    private RegNewsFile imgCover;
    private String attachmentPath;
}
