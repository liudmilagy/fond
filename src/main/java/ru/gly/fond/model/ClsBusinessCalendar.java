package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "cls_business_calendar", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsBusinessCalendar implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_BUSINESS_CALENDAR_SEQ_GEN", sequenceName = "cls_business_calendar_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_BUSINESS_CALENDAR_SEQ_GEN")
    private Long id;
    private Date date;
    private Boolean isHoliday;
    private Boolean isShortened;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "is_holiday")
    public Boolean getIsHoliday() {
        return isHoliday;
    }
    public void setIsHoliday(Boolean isHoliday) {
        this.isHoliday = isHoliday;
    }

    @Basic
    @Column(name = "is_shortened")
    public Boolean getIsShortened() {
        return isShortened;
    }
    public void setIsShortened(Boolean isShortened) {
        this.isShortened = isShortened;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsBusinessCalendar that = (ClsBusinessCalendar) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(date, that.date) &&
                Objects.equals(isHoliday, that.isHoliday) &&
                Objects.equals(isShortened, that.isShortened);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, isHoliday, isShortened);
    }
}
