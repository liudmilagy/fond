package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.dto.ClientAppointmentDto;
import ru.gly.fond.dto.ClsTypeAppointmentDto;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegClientAppointment;
import ru.gly.fond.model.RegTimeTypeAppointment;
import ru.gly.fond.model.RegTypeAppointmentFile;

import javax.servlet.http.HttpSession;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Controller
public class AppointmentContoller extends SuperController{

    @GetMapping("/appointment")
    public String viewAppointment(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "appointment_view";
    }

    @GetMapping("/type_appointments")
    public @ResponseBody
    List<ClsTypeAppointmentDto> getTimeAppointments() {
        List<ClsTypeAppointment> typeAppointments = clsTypeAppointmentRepo.findAllByIsDeleted(false);
        List<ClsTypeAppointmentDto> typeAppointmentDtos = new ArrayList<>();
        typeAppointments.forEach(clsTypeAppointment -> {
            RegTypeAppointmentFile regTypeAppointmentFile = regTypeAppointmentFileRepo.findById(clsTypeAppointment.getIdImgCover()).orElse(null);
            String attachmentPath = (regTypeAppointmentFile != null) ? regTypeAppointmentFile.getAttachmentPath() : "";
            ClsTypeAppointmentDto clsTypeAppointmentDto = ClsTypeAppointmentDto.builder()
                                                        .id(clsTypeAppointment.getId())
                                                        .code(clsTypeAppointment.getCode())
                                                        .name(clsTypeAppointment.getName())
                                                        .description(clsTypeAppointment.getDescription())
                                                        .isDeleted(clsTypeAppointment.getIsDeleted())
                                                        .attachmentPath(attachmentPath)
                                                        .build();
            typeAppointmentDtos.add(clsTypeAppointmentDto);
        });

        return typeAppointmentDtos;
    }

    @GetMapping("/free_times")
    public @ResponseBody
    List<String> getFreeTimes(@RequestParam(value = "id_type_appointment") Long idTypeAppointment,
                              @RequestParam(value = "date_string") String dateString) throws ParseException {

        LocalDate currentLocalDate = LocalDate.now(ZoneId.of("Asia/Irkutsk"));
        LocalTime currentLocalTime = LocalTime.now(ZoneId.of("Asia/Irkutsk"));
        Integer currentMinutes = currentLocalTime.getHour() * 60 + currentLocalTime.getMinute();

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        Date parsed = formatter.parse(dateString);
        LocalDate parsedInLD = parsed.toInstant().atZone(ZoneId.of("Asia/Irkutsk")).toLocalDate();
        Boolean isToday = false;
        if (parsedInLD.compareTo(currentLocalDate) == 0) {
            isToday = true;
        }

        if (clsBusinessCalendarRepo.findByDate(parsed).getIsHoliday()) {
            return null;
        }

        if (parsedInLD.compareTo(currentLocalDate) < 0) {
            return null;
        } else if (ChronoUnit.DAYS.between(currentLocalDate, parsedInLD) > 14 ) {
            return null;
        }
        else {
            java.sql.Date date = new java.sql.Date(parsed.getTime());
            List<RegTimeTypeAppointment> freeRttas = regTimeTypeAppointmentRepo.findFreeTimes(idTypeAppointment, date);

            DateFormat df = new SimpleDateFormat("HH:mm");

            if (isToday) {
                freeRttas = freeRttas.stream()
                            .filter(ctr -> ((ctr.getTime().toLocalTime().getHour()*60  + ctr.getTime().toLocalTime().getMinute()) > (currentMinutes + 2*60)))
                            .collect(Collectors.toList());
            }

            List<String> times = freeRttas.stream()
                    .map(ctr -> df.format(ctr.getTime()))
                    .sorted()
                    .collect(Collectors.toList());

            return times;
        }
    }

    @PostMapping("/save_client_appointment")
    public @ResponseBody
    RegClientAppointment saveClientAppointment(@RequestBody ClientAppointmentDto clientAppointmentDto) {
        try {
            RegClientAppointment rca = appointmentService.createClientAppointment(clientAppointmentDto);
            regClientAppointmentRepo.save(rca);
            emailService.sendMessage(rca);
            smsService.sendMessage(rca);
            return rca;
        }   catch (Exception e) {
            log.error(e);
            return null;
        }
    }

}
