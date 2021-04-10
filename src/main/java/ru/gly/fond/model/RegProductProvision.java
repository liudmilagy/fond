package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "reg_product_provision", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class RegProductProvision {
        @Id
        @Column(name = "id", nullable = false)
        @SequenceGenerator(name = "REG_PRODUCT_PROVISION_GEN", sequenceName = "reg_product_provision_id_seq", allocationSize = 1, schema = "public")
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REG_PRODUCT_PROVISION_GEN")
        private Long id;
        public Long getId() {return id;}
        public void setId(Long id) {this.id = id;}


        @OneToOne
        @JoinColumn(name = "id_product", referencedColumnName = "id")
        private ClsProduct product;
        public ClsProduct getProduct() {
                return product;
        }
        public void setProduct(ClsProduct product) {
                this.product = product;
        }

        @OneToOne
        @JoinColumn(name = "id_provision", referencedColumnName = "id")
        private ClsProvision provision;
        public ClsProvision getProvision() {
                return provision;
        }
        public void setProvision(ClsProvision provision) {
                this.provision = provision;
        }

        @Basic
        @Column(name = "min_amount")
        private Integer minAmount;
        public Integer getMinAmount() {
                return minAmount;
        }
        public void setMinAmount(Integer minAmount) {
                this.minAmount = minAmount;
        }

        @Basic
        @Column(name = "max_amount")
        private Integer maxAmount;
        public Integer getMaxAmount() {
                return maxAmount;
        }
        public void setMaxAmount(Integer maxAmount) {
                this.maxAmount = maxAmount;
        }

        @Basic
        @Column(name = "interest_rate")
        private Float interestRate;
        public Float getInterestRate() {
                return interestRate;
        }
        public void setInterestRate(Float interestRate) {
                this.interestRate = interestRate;
        }

        @Basic
        @Column(name = "has_key_rate")
        private Boolean hasKeyRate;
        public Boolean getHasKeyRate() {
                return hasKeyRate;
        }
        public void setHasKeyRate(Boolean hasKeyRate) {
                this.hasKeyRate = hasKeyRate;
        }

        @Basic
        @Column(name = "coef_key_rate")
        private Float coefKeyRate;
        public Float getCoefKeyRate() {
                return coefKeyRate;
        }
        public void setCoefKeyRate(Float coefKeyRate) {
                this.coefKeyRate = coefKeyRate;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                RegProductProvision that = (RegProductProvision) o;
                return Objects.equals(id, that.id) &&
                        Objects.equals(product, that.product) &&
                        Objects.equals(provision, that.provision) &&
                        Objects.equals(minAmount, that.minAmount) &&
                        Objects.equals(maxAmount, that.maxAmount) &&
                        Objects.equals(interestRate, that.interestRate) &&
                        Objects.equals(hasKeyRate, that.hasKeyRate) &&
                        Objects.equals(coefKeyRate, that.coefKeyRate);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, product, provision, minAmount, maxAmount, interestRate, hasKeyRate, coefKeyRate);
        }
}
