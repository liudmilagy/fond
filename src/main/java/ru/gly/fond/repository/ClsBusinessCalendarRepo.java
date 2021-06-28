package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsBusinessCalendar;

import java.util.Date;


@Repository
public interface ClsBusinessCalendarRepo extends JpaRepository<ClsBusinessCalendar, Long> {

    ClsBusinessCalendar findByDate(Date date);

}
