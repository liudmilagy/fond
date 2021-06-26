package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    private Boolean         isHidden;
    private String          htmlText;
    private Boolean         notActive;
    private String          iconName;
    private Long            idImgCover;
    private Integer         weight;



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
    @Column(name = "is_hidden")
    public Boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Boolean isHidden) {
        this.isHidden = isHidden;
    }

    @Basic
    @Column(name = "html_text")
    public String getHtmlText() {
        return htmlText;
    }

    public void setHtmlText(String htmlText) {
        this.htmlText = htmlText;
    }

    @Basic
    @Column(name = "not_active")
    public Boolean getNotActive() {
        return notActive;
    }

    public void setNotActive(Boolean notActive) {
        this.notActive = notActive;
    }

    @Basic
    @Column(name = "icon_name")
    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    @Basic
    @Column(name = "id_img_cover")
    public Long getIdImgCover() {
        return idImgCover;
    }

    public void setIdImgCover(Long idImgCover) {
        this.idImgCover = idImgCover;
    }

    @Basic
    @Column(name = "weight")
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsProduct that = (ClsProduct) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(limitation, that.limitation) &&
                Objects.equals(isHidden, that.isHidden) &&
                Objects.equals(htmlText, that.htmlText) &&
                Objects.equals(notActive, that.notActive) &&
                Objects.equals(idImgCover, that.idImgCover) &&
                Objects.equals(iconName, that.iconName) &&
                Objects.equals(weight, that.weight);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, limitation, isHidden, htmlText, notActive, idImgCover, iconName, weight);
    }
}
