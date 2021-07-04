package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.RegTypeAppointmentFile;



@Repository
public interface RegTypeAppointmentFileRepo extends JpaRepository<RegTypeAppointmentFile, Long> {
}