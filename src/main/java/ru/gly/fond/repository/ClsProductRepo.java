package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsProduct;

import java.util.List;

@Repository
public interface ClsProductRepo extends JpaRepository<ClsProduct, Long> {
    List<ClsProduct> findAllByIsHidden(Boolean isHidden);
}
