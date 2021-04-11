package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsProductEntity;

import java.util.List;

@Repository
public interface ClsProductEntityRepo extends JpaRepository<ClsProductEntity, Long> {
    @Query(name = "get_products_for_calculator", nativeQuery = true)
    List<ClsProductEntity> getProductsForCalculator(@Param("id_provision_with_deposit") Long idProvisionWithDeposit,
                                                    @Param("id_provision_without_deposit") Long idProvisionWithoutDeposit);
}
