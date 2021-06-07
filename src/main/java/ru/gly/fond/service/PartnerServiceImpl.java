package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.PartnerDto;
import ru.gly.fond.model.ClsPartner;
import ru.gly.fond.model.RegPartnerFile;

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
}
