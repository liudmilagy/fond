package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.GeneralTable;

@Repository
public interface GeneralTableRepo extends JpaRepository<GeneralTable, Long> {
    GeneralTable findByCode(String code);
}
