package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsTab;

@Repository
public interface ClsTabRepo extends JpaRepository<ClsTab, Long> {
    ClsTab findByCode(String code);
}