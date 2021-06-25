package ru.gly.fond.service;

import org.springframework.data.domain.Page;
import ru.gly.fond.dto.PartnerDto;

import java.util.List;

public interface PartnerService {
    List<PartnerDto> getAllPartners();
    Page<PartnerDto> getPartnerPage(int page, int size);
}
