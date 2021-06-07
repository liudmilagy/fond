package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.RegPartnerFile;

import java.util.List;


@Repository
public interface RegPartnerFileRepo extends JpaRepository<RegPartnerFile, Long> {

    List<RegPartnerFile> findAllByIsDeleted(boolean isDeleted);
}
