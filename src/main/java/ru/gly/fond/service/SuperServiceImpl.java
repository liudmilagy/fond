package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.gly.fond.model.RegPartnerFile;
import ru.gly.fond.repository.*;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
@Slf4j
public class SuperServiceImpl implements SuperService{

    @Autowired
    ClsProductRepo clsProductRepo;

    @Autowired
    ClsProvisionRepo clsProvisionRepo;

    @Autowired
    RegProductProvisionRepo regProductProvisionRepo;

    @Autowired
    ClsProductEntityRepo clsProductEntityRepo;

    @Autowired
    RegNewsFileRepo regNewsFileRepo;

    @Autowired
    ClsNewsRepo clsNewsRepo;

    @Autowired
    ClsTypeAppointmentRepo clsTypeAppointmentRepo;

    @Autowired
    ClsPartnerRepo clsPartnerRepo;

    @Autowired
    RegPartnerFileRepo regPartnerFileRepo;

    @Autowired
    EmailService emailService;

    @Value("${upload.path:/uploads}")
    String uploadingDir;

    @Override
    public Date parseDateFromForm(String stringDate) {
        Date date = null;
        try {
            if (stringDate != null && !stringDate.equals("")) {
                date = new Date(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(stringDate).getTime());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return date;
    }

    public static String withLargeIntegers(Integer value) {
        DecimalFormat formatter = (DecimalFormat) NumberFormat.getInstance(Locale.getDefault());
        DecimalFormatSymbols symbols = formatter.getDecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');
        DecimalFormat df = new DecimalFormat("###,###", symbols);
        return df.format(value);
    }

}
