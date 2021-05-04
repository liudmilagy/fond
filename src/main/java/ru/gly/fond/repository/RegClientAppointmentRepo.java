package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.RegClientAppointment;

@Repository
public interface RegClientAppointmentRepo extends JpaRepository<RegClientAppointment, Long> {
}
