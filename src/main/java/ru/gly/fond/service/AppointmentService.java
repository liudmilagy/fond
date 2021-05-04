package ru.gly.fond.service;

import ru.gly.fond.dto.ClientAppointmentDto;
import ru.gly.fond.model.RegClientAppointment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface AppointmentService {
    RegClientAppointment createClientAppointment(ClientAppointmentDto clientAppointmentDto) throws ParseException;
}
