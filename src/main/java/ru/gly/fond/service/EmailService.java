package ru.gly.fond.service;

import org.springframework.mail.MailException;
import ru.gly.fond.model.RegClientAppointment;

public interface EmailService {
    void sendSimpleMessage(String to, String from, String subject, String text) throws MailException;
    void sendMessage(RegClientAppointment clientAppointment);
}
