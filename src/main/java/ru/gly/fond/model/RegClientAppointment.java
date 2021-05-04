package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "reg_client_appointment", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class RegClientAppointment {
        @Id
        @Column(name = "id", nullable = false)
        @SequenceGenerator(name = "REG_CLIENT_APPOINTMENT_GEN", sequenceName = "reg_client_appointment_id_seq", allocationSize = 1, schema = "public")
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REG_CLIENT_APPOINTMENT_GEN")
        private Long id;
        public Long getId() {return id;}
        public void setId(Long id) {this.id = id;}

        @OneToOne
        @JoinColumn(name = "id_type_appointment", referencedColumnName = "id")
        private ClsTypeAppointment clsTypeAppointment;
        public ClsTypeAppointment getClsTypeAppointment() {
                return clsTypeAppointment;
        }
        public void setClsTypeAppointment(ClsTypeAppointment clsTypeAppointment) {
                this.clsTypeAppointment = clsTypeAppointment;
        }

        @Basic
        @Column(name = "time")
        private Time time;
        public Time getTime() {
                return time;
        }
        public void setTime(Time time) {
                this.time = time;
        }

        @Basic
        @Column(name = "text_time_appointment")
        private String textTimeAppointment;
        public String getTextTimeAppointment() {
                return textTimeAppointment;
        }
        public void setTextTimeAppointment(String textTimeAppointment) {
                this.textTimeAppointment = textTimeAppointment;
        }

        @Basic
        @Column(name = "client_name")
        private String clientName;
        public String getClientName() {
                return clientName;
        }
        public void setClientName(String clientName) {
                this.clientName = clientName;
        }

        @Basic
        @Column(name = "phone_number")
        private String phoneNumber;
        public String getPhoneNumber() {
                return phoneNumber;
        }
        public void setPhoneNumber(String phoneNumber) {
                this.phoneNumber = phoneNumber;
        }

        @Basic
        @Column(name = "email")
        private String email;
        public String getEmail() {
                return email;
        }
        public void setEmail(String email) {
                this.email = email;
        }

        @Basic
        @Column(name = "message")
        private String message;
        public String getMessage() {
                return message;
        }
        public void setMessage(String message) {
                this.message = message;
        }

        @Basic
        @Column(name = "changed_by_admin")
        private Boolean changedByAdmin;
        public Boolean getChangedByAdmin() {
                return changedByAdmin;
        }
        public void setChangedByAdmin(Boolean changedByAdmin) {
                this.changedByAdmin = changedByAdmin;
        }

        @Basic
        @Column(name = "date")
        private Date date;
        public Date getDate() {
                return date;
        }
        public void setDate(Date date) {
                this.date = date;
        }


        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                RegClientAppointment that = (RegClientAppointment) o;
                return Objects.equals(id, that.id) && Objects.equals(clsTypeAppointment, that.clsTypeAppointment) && Objects.equals(time, that.time) && Objects.equals(textTimeAppointment, that.textTimeAppointment) && Objects.equals(clientName, that.clientName) && Objects.equals(phoneNumber, that.phoneNumber) && Objects.equals(email, that.email) && Objects.equals(message, that.message) && Objects.equals(changedByAdmin, that.changedByAdmin) && Objects.equals(date, that.date);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, clsTypeAppointment, time, textTimeAppointment, clientName, phoneNumber, email, message, changedByAdmin, date);
        }
}
