package ru.gly.fond.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.gly.fond.dto.PartnerDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
public class PartnerController extends SuperController{
    @GetMapping("/partners_main")
    public @ResponseBody Map<String, Object> getAllPartners( @RequestParam(value = "start", required = false) Integer start,
                                                          @RequestParam(value = "count", required = false) Integer count) {
        int page = start == null ? 0 : start / 8;
        int size = count == null ? 8 : count;

        Page<PartnerDto> templates = partnerService.getPartnerPage(page, size);

        Map<String, Object> result = new HashMap<>();

        result.put("data", templates.getContent());
        result.put("pos", (long) page * size);
        result.put("total_count", templates.getTotalElements());
        return result;
    }

    @GetMapping("/partners_main_mobile/{pager_cnt}")
    public @ResponseBody Map<String, Object> getAllPartners(@PathVariable(value = "pager_cnt", required = false) Integer pagerCnt,
                                                            @RequestParam(value = "start", required = false) Integer start,
                                                          @RequestParam(value = "count", required = false) Integer count) {
        int page = start == null ? 0 : start / pagerCnt;
        int size = count == null ? pagerCnt : pagerCnt;

        Page<PartnerDto> templates = partnerService.getPartnerPage(page, size);

        Map<String, Object> result = new HashMap<>();

        result.put("data", templates.getContent());
        result.put("pos", (long) page * size);
        result.put("total_count", templates.getTotalElements());
        return result;
    }
}
