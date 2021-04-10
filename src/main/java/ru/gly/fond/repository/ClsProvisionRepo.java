package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsProvision;

@Repository
public interface ClsProvisionRepo extends JpaRepository<ClsProvision, Long> {
    ClsProvision findByCode(String code);
}
