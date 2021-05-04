package ru.gly.fond.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gly.fond.model.ClsTypeAppointment;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Objects;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ClientAppointmentDto {
        private Long idTypeAppointment;
        private String time;
        private String textTimeAppointment;
        private String clientName;
        private String phoneNumber;
        private String email;
        private String message;
        private Boolean changedByAdmin;
        private String date;
}
