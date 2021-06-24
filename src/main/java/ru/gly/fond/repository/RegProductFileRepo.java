package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.RegProductFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Repository
public interface RegProductFileRepo extends JpaRepository<RegProductFile, Long> {
    Optional<List<RegProductFile>> findRegProductFilesByProductAndIsDeleted(ClsProduct product, Boolean deleted);
    Optional<List<RegProductFile>> findRegProductFilesByProductAndIsDeletedAndIsHidden(ClsProduct product, Boolean deleted, Boolean hidden);


    @Modifying
    @Transactional
    @Query(
            value = "UPDATE reg_product_file SET is_deleted = true WHERE id in (:productFileIds)",
            nativeQuery = true
    )
    void updateFilesAsDeleted(Set<Long> productFileIds);

    @Modifying
    @Transactional
    @Query(
            value = "UPDATE reg_product_file SET is_deleted = false, id_product = :productId WHERE id in (:productFileIds)",
            nativeQuery = true
    )
    void updateFilesAsNotDeletedAndSetProductId(Set<Long> productFileIds, Long productId);
}
