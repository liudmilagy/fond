package ru.gly.fond.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.gly.fond.model.RegNewsFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class NewsFileServiceImpl extends SuperServiceImpl implements NewsFileService {

    @Override
    public RegNewsFile getNewsFileByNewsId(Long newsId) {
        RegNewsFile regNewsFile = regNewsFileRepo.findById(newsId).orElse(null);
        return regNewsFile;
    }
}
