package ru.gly.fond.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ru.gly.fond.config.ApplicationConstants;
import ru.gly.fond.model.ClsTypeAppointment;
import ru.gly.fond.model.RegClientAppointment;
import ru.gly.fond.repository.*;
import ru.gly.fond.service.*;

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

    @Autowired
    protected NewsService newsService;

    @Autowired
    protected ClsNewsRepo clsNewsRepo;

    @Autowired
    protected RegNewsFileRepo regNewsFileRepo;

    @Autowired
    protected RegClientAppointmentRepo regClientAppointmentRepo;

    @Autowired
    protected ClsTabRepo clsTabRepo;

    @Autowired
    protected RegTabFileRepo regTabFileRepo;

    @Autowired
    protected EmailService emailService;

    @Autowired
    protected GeneralTableRepo generalTableRepo;

    @Autowired
    protected PartnerService partnerService;

    @Autowired
    protected SmsService smsService;

}
