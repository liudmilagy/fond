package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsProduct;
import ru.gly.fond.model.ClsProvision;
import ru.gly.fond.model.RegProductProvision;

import java.util.List;

@Repository
public interface RegProductProvisionRepo extends JpaRepository<RegProductProvision, Long> {

//    WITH
//    product as (
//            SELECT *
//            FROM cls_product
//            WHERE is_hidden = false
//    ),
//    max_product_provision as (
//            SELECT id_product, max(max_amount) as max
//    FROM reg_product_provision
//    GROUP BY reg_product_provision.id_product
//)
//    SELECT reg_product_provision.*
//    FROM max_product_provision
//    LEFT JOIN reg_product_provision
//    ON max_product_provision.id_product = reg_product_provision.id_product
//    AND max_product_provision.max = reg_product_provision.max_amount

    @Query(nativeQuery = true, value = "WITH\n" +
            "product as (\n" +
            "    SELECT *\n" +
            "    FROM cls_product\n" +
            "    WHERE is_hidden = false\n" +
            "    ),\n" +
            "max_product_provision as (\n" +
            "    SELECT id_product, max(max_amount) as max\n" +
            "    FROM reg_product_provision\n" +
            "    GROUP BY reg_product_provision.id_product\n" +
            ")\n" +
            "SELECT reg_product_provision.*\n" +
            "FROM max_product_provision\n" +
            "LEFT JOIN reg_product_provision\n" +
            "ON max_product_provision.id_product = reg_product_provision.id_product\n" +
            "    AND max_product_provision.max = reg_product_provision.max_amount")
    List<RegProductProvision> getProductProvisionWithMaxAmount();
}
