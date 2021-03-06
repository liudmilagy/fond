package ru.gly.fond.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegClientAppointment;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Log4j2
@Service
public class EmailServiceImpl extends SuperServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.from}")
    private String fromAddress;

    @Value("${fond.mail}")
    private String fondMail;


    @Override
    public void sendSimpleMessage(String to, String from, String subject, String text) throws MailException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            message.setFrom(from);

            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Не удалось отправить письмо. " + e.getMessage());
        }

    }

    @Override
    public void sendMessage(RegClientAppointment clientAppointment) {
        String clientEmail = clientAppointment.getEmail();
        String subject = "Онлайн-запись. Фонд03";
        DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
        DateFormat tf = new SimpleDateFormat("hh:mm");
        if (!clientEmail.isEmpty()) {
            ClsTypeAppointment typeAppointment = clientAppointment.getClsTypeAppointment();
            String message = clientAppointment.getClientName() + ", Вы успешно записаны на '" + typeAppointment.getName() + "'. \n" +
                            "Дата: " + df.format(clientAppointment.getDate()) + "\n" +
//                            "Время: " + tf.format(clientAppointment.getTime());
                           "Время: " + clientAppointment.getTime().toString().substring(0, 5);

            sendSimpleMessage(clientEmail, fromAddress, subject, message);


            String messageToFond = "Клиент: " + clientAppointment.getClientName() + "\n" +
                    "Тип записи: " + typeAppointment.getName() + "\n" +
                    "Дата: " + df.format(clientAppointment.getDate()) + "\n" +
//                    "Время: " + tf.format(clientAppointment.getTime());
                    "Время: " + clientAppointment.getTime().toString().substring(0, 5);
            sendSimpleMessage(fondMail, fromAddress, subject, messageToFond);
        }
    }
}
