package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.Objects;

@Entity
@Table(name = "reg_time_type_appointment", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class RegTimeTypeAppointment {
        @Id
        @Column(name = "id", nullable = false)
        @SequenceGenerator(name = "REG_TIME_TYPE_APPOINTMENT_GEN", sequenceName = "reg_time_type_appointment_id_seq", allocationSize = 1, schema = "public")
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REG_TIME_TYPE_APPOINTMENT_GEN")
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

//        @Basic
//        @Column(name = "not_active")
//        private Boolean notActive;
//        public Boolean getNotActive() {
//                return notActive;
//        }
//        public void setNotActive(Boolean notActive) {
//                this.notActive = notActive;
//        }
//
//        @Basic
//        @Column(name = "last_change_time")
//        private Timestamp lastChangeTime;
//        public Timestamp getLastChangeTime() {
//                return lastChangeTime;
//        }
//        public void setLastChangeTime(Timestamp lastChangeTime) {
//                this.lastChangeTime = lastChangeTime;
//        }
//
//        @ManyToOne
//        @JoinColumn(name = "id_user", referencedColumnName = "id")
//        private ClsUser user;
//        public ClsUser getUser() {
//                return user;
//        }
//        public void setUser(ClsUser user) {
//                this.user = user;
//        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                RegTimeTypeAppointment that = (RegTimeTypeAppointment) o;
                return Objects.equals(id, that.id) &&
                        Objects.equals(clsTypeAppointment, that.clsTypeAppointment) &&
                        Objects.equals(time, that.time);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, clsTypeAppointment, time);
        }
}
