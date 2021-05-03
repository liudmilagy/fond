package ru.gly.fond.service;

import org.springframework.web.multipart.MultipartFile;
import ru.gly.fond.model.RegNewsFile;


import java.util.List;

public interface NewsFileService {
    RegNewsFile getNewsFileByNewsId(Long newsId);
}
