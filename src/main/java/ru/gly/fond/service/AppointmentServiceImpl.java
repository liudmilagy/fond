package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.gly.fond.dto.ClientAppointmentDto;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegClientAppointment;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Service
@Slf4j
public class AppointmentServiceImpl extends SuperServiceImpl implements AppointmentService {
    @Override
    public RegClientAppointment createClientAppointment(ClientAppointmentDto clientAppointmentDto) throws ParseException {
        ClsTypeAppointment typeAppointment = clsTypeAppointmentRepo.findById(clientAppointmentDto.getIdTypeAppointment()).orElse(null);
        Date date = new SimpleDateFormat("dd.MM.yyyy").parse(clientAppointmentDto.getDate());
        Time time = new Time(new SimpleDateFormat("HH:mm").parse(clientAppointmentDto.getTime()).getTime());
        RegClientAppointment rca = RegClientAppointment.builder()
                .clsTypeAppointment(typeAppointment)
                .date(date)
                .time(time)
                .textTimeAppointment(clientAppointmentDto.getTextTimeAppointment())
                .clientName(clientAppointmentDto.getClientName())
                .phoneNumber(clientAppointmentDto.getPhoneNumber())
                .email(clientAppointmentDto.getEmail())
                .message(clientAppointmentDto.getMessage())
                .changedByAdmin(false)
                .build();
        return rca;
    }
}
