package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.RegTimeTypeAppointment;

import java.sql.Date;
import java.util.List;

@Repository
public interface RegTimeTypeAppointmentRepo extends JpaRepository<RegTimeTypeAppointment, Long> {

    @Query(nativeQuery = true, value = "WITH\n" +
            "type_times as (\n" +
            "    SELECT *\n" +
            "    FROM reg_time_type_appointment\n" +
            "    WHERE id_type_appointment = :id_type_appointment\n" +
            "),\n" +
            "taken_times as (\n" +
            "    SELECT *\n" +
            "    FROM reg_client_appointment\n" +
            "    WHERE id_type_appointment = :id_type_appointment and date = :date\n" +
            ")\n" +
            "SELECT type_times.*\n" +
            "FROM type_times\n" +
            "LEFT JOIN taken_times\n" +
            "ON type_times.time = taken_times.time\n" +
            "WHERE taken_times.id IS NULL;")
    List<RegTimeTypeAppointment> findFreeTimes(@Param(value = "id_type_appointment") Long typeAppointmentId, @Param(value = "date") Date date);
}
