package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.gly.fond.model.RegTabFile;

import java.util.List;
import java.util.Set;


@Repository
public interface RegTabFileRepo extends JpaRepository<RegTabFile, Long> {
    List<RegTabFile> findRegTabFileByTab_IdAndIsDeleted(long id_tab, boolean deleted);
}