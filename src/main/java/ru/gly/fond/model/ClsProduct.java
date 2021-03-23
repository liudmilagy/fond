package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "cls_product", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsProduct {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_PRODUCT_SEQ_GEN", sequenceName = "cls_product_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_PRODUCT_SEQ_GEN")
    private Long            id;
    private String          name;
    private Integer         limitation;
    private Integer         minAmountWDeposit;
    private Integer         maxAmountWDeposit;
    private Integer         minAmountWODeposit;
    private Integer         maxAmountWODeposit;
    private Float           interestRate;
    private Boolean         hasKeyRate;
    private Boolean         isDeleted;
    private Boolean         isHidden;
    private Timestamp       timeCreate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "limitation")
    public Integer getLimitation() {
        return limitation;
    }

    public void setLimitation(Integer limitation) {
        this.limitation = limitation;
    }

    @Basic
    @Column(name = "interest_rate")
    public Float getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Float interestRate) {
        this.interestRate = interestRate;
    }

    @Basic
    @Column(name = "has_key_rate")
    public Boolean getHasKeyRate() {
        return hasKeyRate;
    }

    public void setHasKeyRate(Boolean hasKeyRate) {
        this.hasKeyRate = hasKeyRate;
    }

    @Basic
    @Column(name = "min_amount_w_deposit")
    public Integer getMinAmountWDeposit() {
        return minAmountWDeposit;
    }

    public void setMinAmountWDeposit(Integer minAmountWDeposit) {
        this.minAmountWDeposit = minAmountWDeposit;
    }

    @Basic
    @Column(name = "max_amount_w_deposit")
    public Integer getMaxAmountWDeposit() {
        return maxAmountWDeposit;
    }

    public void setMaxAmountWDeposit(Integer maxAmountWDeposit) {
        this.maxAmountWDeposit = maxAmountWDeposit;
    }

    @Basic
    @Column(name = "min_amount_wo_deposit")
    public Integer getMinAmountWODeposit() {
        return minAmountWODeposit;
    }

    public void setMinAmountWODeposit(Integer minAmountWODeposit) {
        this.minAmountWODeposit = minAmountWODeposit;
    }

    @Basic
    @Column(name = "max_amount_wo_deposit")
    public Integer getMaxAmountWODeposit() {
        return maxAmountWODeposit;
    }

    public void setMaxAmountWODeposit(Integer maxAmountWODeposit) {
        this.maxAmountWODeposit = maxAmountWODeposit;
    }

    @Basic
    @Column(name = "is_deleted")
    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Basic
    @Column(name = "is_hidden")
    public Boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }


    @Basic
    @Column(name = "time_create")
    public Timestamp getTimeCreate() {
        return timeCreate;
    }

    public void setTimeCreate(Timestamp timeCreate) {
        this.timeCreate = timeCreate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsProduct that = (ClsProduct) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(limitation, that.limitation) &&
                Objects.equals(minAmountWDeposit, that.minAmountWDeposit) &&
                Objects.equals(maxAmountWDeposit, that.maxAmountWDeposit) &&
                Objects.equals(minAmountWODeposit, that.minAmountWODeposit) &&
                Objects.equals(maxAmountWODeposit, that.maxAmountWODeposit) &&
                Objects.equals(interestRate, that.interestRate) &&
                Objects.equals(hasKeyRate, that.hasKeyRate) &&
                Objects.equals(isDeleted, that.isDeleted) &&
                Objects.equals(isHidden, that.isHidden) &&
                Objects.equals(timeCreate, that.timeCreate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, limitation, minAmountWDeposit, maxAmountWDeposit, minAmountWODeposit, maxAmountWODeposit, interestRate, hasKeyRate, isDeleted, isHidden, timeCreate);
    }
}
