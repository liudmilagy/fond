package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsTypeAppointment;

import java.util.List;

@Repository
public interface ClsTypeAppointmentRepo extends JpaRepository<ClsTypeAppointment, Long> {
    List<ClsTypeAppointment> findAllByIsDeleted(Boolean isDeleted);
}
