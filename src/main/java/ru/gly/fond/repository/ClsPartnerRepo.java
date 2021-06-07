package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.gly.fond.dto.PartnerDto;
import ru.gly.fond.model.ClsPartner;

import java.util.List;

@Repository
public interface ClsPartnerRepo extends JpaRepository<ClsPartner, Long> {
    List<ClsPartner> findAllByIsDeleted(Boolean isDeleted);

//    @Query(value = "SELECT cp.id, cp.name, cp.url, rpf.attachment_path as logo_path\n" +
//            "FROM cls_partners cp\n" +
//            "LEFT JOIN reg_partner_file rpf on cp.id = rpf.id_partner and cp.file_id = rpf.id\n" +
//            "WHERE cp.is_deleted = false ",
//            nativeQuery = true)
//    List<PartnerDto> findAllPartnerDto();
}
