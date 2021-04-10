package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "cls_provision", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsProvision implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_PROVISION_SEQ_GEN", sequenceName = "cls_provision_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_PROVISION_SEQ_GEN")
    private Long id;
    private String name;
    private String code;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsProvision that = (ClsProvision) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(code, that.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, code);
    }
}
