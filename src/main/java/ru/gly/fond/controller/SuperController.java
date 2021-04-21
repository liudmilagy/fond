package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ru.gly.fond.config.ApplicationConstants;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.repository.ClsProductRepo;
import ru.gly.fond.repository.ClsTypeAppointmentRepo;
import ru.gly.fond.repository.RegProductFileRepo;
import ru.gly.fond.repository.RegTimeTypeAppointmentRepo;
import ru.gly.fond.service.AppointmentService;
import ru.gly.fond.service.ClsProductService;
import ru.gly.fond.service.SuperService;

@Log4j2
@Controller
public class SuperController {

    @Autowired
    protected ApplicationConstants applicationConstants;

    @Autowired
    protected ClsProductService clsProductService;

    @Autowired
    protected ClsTypeAppointmentRepo clsTypeAppointmentRepo;

    @Autowired
    protected AppointmentService appointmentService;

    @Autowired
    protected RegTimeTypeAppointmentRepo regTimeTypeAppointmentRepo;

    @Autowired
    protected ClsProductRepo clsProductRepo;

    @Autowired
    protected RegProductFileRepo regProductFileRepo;

}
