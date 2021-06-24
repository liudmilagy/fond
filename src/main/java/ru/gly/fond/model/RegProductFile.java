package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "reg_product_file", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class RegProductFile {


    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "REG_PRODUCT_FILE_GEN", sequenceName = "reg_product_file_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REG_PRODUCT_FILE_GEN")
    private Long id;
    private Boolean isDeleted;
    private Timestamp timeCreate;
    private String attachmentPath;
    private String fileName;
    private String originalFileName;
    private String fileExtension;
    private String hash;
    private Long fileSize;
    private Boolean isHidden;


    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}


    @ManyToOne
    @JoinColumn(name = "id_product", referencedColumnName = "id")
    private ClsProduct product;

    public ClsProduct getProduct() {
        return product;
    }

    public void setProduct(ClsProduct product) {
        this.product = product;
    }

    @Basic
    @Column(name = "is_deleted", nullable = true)
    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @Basic
    @Column(name = "time_create", nullable = false)
    public Timestamp getTimeCreate() {
        return timeCreate;
    }

    public void setTimeCreate(Timestamp timeCreate) {
        this.timeCreate = timeCreate;
    }

    @Basic
    @Column(name = "attachment_path", nullable = true, length = -1)
    public String getAttachmentPath() {
        return attachmentPath;
    }

    public void setAttachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
    }

    @Basic
    @Column(name = "file_name", nullable = true, length = -1)
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Basic
    @Column(name = "original_file_name", nullable = true, length = -1)
    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    @Basic
    @Column(name = "file_extension", nullable = true, length = 16)
    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    @Basic
    @Column(name = "hash", nullable = true, length = -1)
    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    @Basic
    @Column(name = "file_size", nullable = true)
    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Boolean getHidden() {
        return isHidden;
    }

    public void setHidden(Boolean hidden) {
        isHidden = hidden;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegProductFile that = (RegProductFile) o;
        return Objects.equals(id, that.id) && Objects.equals(isDeleted, that.isDeleted) && Objects.equals(timeCreate, that.timeCreate) && Objects.equals(attachmentPath, that.attachmentPath) && Objects.equals(fileName, that.fileName) && Objects.equals(originalFileName, that.originalFileName) && Objects.equals(fileExtension, that.fileExtension) && Objects.equals(hash, that.hash) && Objects.equals(fileSize, that.fileSize) && Objects.equals(isHidden, that.isHidden) && Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, isDeleted, timeCreate, attachmentPath, fileName, originalFileName, fileExtension, hash, fileSize, isHidden, product);
    }
}
