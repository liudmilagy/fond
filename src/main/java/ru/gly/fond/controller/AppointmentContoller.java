package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegTimeTypeAppointment;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Controller
public class AppointmentContoller extends SuperController{

    @GetMapping("/type_appointments")
    public @ResponseBody
    List<ClsTypeAppointment> getTimeAppointments() {
        List<ClsTypeAppointment> typeAppointments = clsTypeAppointmentRepo.findAllByIsDeleted(false);
        return typeAppointments;
    }

    @GetMapping("/free_times")
    public @ResponseBody
    List<String> getFreeTimes(@RequestParam(value = "id_type_appointment") Long idTypeAppointment, @RequestParam(value = "date_string") String dateString) throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        Date parsed = formatter.parse(dateString);
        java.sql.Date date = new java.sql.Date(parsed.getTime());
        List<RegTimeTypeAppointment> freeRttas = regTimeTypeAppointmentRepo.findFreeTimes(idTypeAppointment, date);

        DateFormat df = new SimpleDateFormat("HH:mm");
        List<String> times = freeRttas.stream()
                            .map(ctr -> df.format(ctr.getTime()))
                            .sorted()
                            .collect(Collectors.toList());
        return times;
    }

//    @PostMapping

}
