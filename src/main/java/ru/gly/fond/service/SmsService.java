package ru.gly.fond.service;

import ru.gly.fond.model.RegClientAppointment;

public interface SmsService {
    void sendMessage(RegClientAppointment clientAppointment);
}
