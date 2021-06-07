package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "cls_partners", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsPartner {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_PARTNERS_SEQ_GEN", sequenceName = "cls_partners_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_PARTNERS_SEQ_GEN")
    private Long id;

    private String name;
    private Boolean isDeleted;
    private String url;
    private Long fileId;

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
    @Column(name = "is_deleted")
    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @Basic
    @Column(name = "url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Basic
    @Column(name = "file_id")
    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsPartner that = (ClsPartner) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(isDeleted, that.isDeleted) && Objects.equals(url, that.url) && Objects.equals(fileId, that.fileId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, isDeleted, url, fileId);
    }
}
