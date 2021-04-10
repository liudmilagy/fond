package ru.gly.fond.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.gly.fond.repository.ClsProductRepo;
import ru.gly.fond.repository.ClsProvisionRepo;
import ru.gly.fond.repository.RegProductProvisionRepo;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Slf4j
public class SuperServiceImpl implements SuperService{

    @Autowired
    ClsProductRepo clsProductRepo;

    @Autowired
    ClsProvisionRepo clsProvisionRepo;

    @Autowired
    RegProductProvisionRepo regProductProvisionRepo;

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

}
