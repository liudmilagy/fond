package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.PartnerDto;
import ru.gly.fond.model.ClsPartner;
import ru.gly.fond.model.RegPartnerFile;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.lang3.tuple.Pair;


@Service
@Slf4j
public class PartnerServiceImpl extends SuperServiceImpl implements PartnerService{
    @Override
    public List<PartnerDto> getAllPartners() {
        List<ClsPartner> partners = clsPartnerRepo.findAllByIsDeleted(false);
        List<RegPartnerFile> partnerFiles = regPartnerFileRepo.findAllByIsDeleted(false);
        Map<Pair<Long, Long>, String> mapFiles = new HashMap<>();
        partnerFiles.forEach(ctr -> {mapFiles.put(Pair.of(ctr.getPartner().getId(), ctr.getId()), ctr.getAttachmentPath());
        });

        List<PartnerDto> partnerDtos = partners.stream()
                .map(ctr -> PartnerDto.builder()
                            .id(ctr.getId())
                            .name(ctr.getName())
                            .logoPath(mapFiles.get(Pair.of(ctr.getId(), ctr.getFileId())))
                            .url(ctr.getUrl())
                            .build())
                .collect(Collectors.toList());
        return  partnerDtos;
    }

    @Override
    public Page<PartnerDto> getPartnerPage(int page, int size) {
        List<PartnerDto> partnerList = getAllPartners();

        Pageable pageable = PageRequest.of(page, size);
        long start = pageable.getOffset();
        long end = (start + pageable.getPageSize()) > partnerList.size() ? partnerList.size() : (start + pageable.getPageSize());

        Page<PartnerDto> pages = new PageImpl<PartnerDto>(partnerList.subList((int) start, (int) end), pageable, partnerList.size());
        return pages;
    }
}
