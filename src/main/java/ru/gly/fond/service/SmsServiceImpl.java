package ru.gly.fond.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegClientAppointment;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Service
public class SmsServiceImpl implements SmsService {

    @Value("${websms.login}")
    private String user;

    @Value("${websms.password}")
    private String password;

    @Override
    public void sendMessage(RegClientAppointment clientAppointment) {
        HttpSmsSender ws = new HttpSmsSender(user, password);

        String clientPhone = clientAppointment.getPhoneNumber();
        DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
        DateFormat tf = new SimpleDateFormat("hh:mm");
        if (!clientPhone.isEmpty()) {
            ClsTypeAppointment typeAppointment = clientAppointment.getClsTypeAppointment();
            String message = clientAppointment.getClientName() + ", Вы успешно записаны на '" + typeAppointment.getName() + "'. \n" +
                    "Дата: " + df.format(clientAppointment.getDate()) + "\n" +
                    "Время: " + tf.format(clientAppointment.getTime());
            int responseCode = ws.send(clientPhone, message, "", Integer.parseInt(""+clientAppointment.getId()), false, false);
            System.out.println(responseCode);
            System.out.println(ws.getStatus());
        }
    }
}
