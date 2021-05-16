package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "cls_tab", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsTab {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_TAB_GEN", sequenceName = "cls_tab_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_TAB_GEN")
    private Long id;
    private String name;
    private String code;
    private String htmlText;

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
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "html_text")
    public String getHtmlText() {
        return htmlText;
    }

    public void setHtmlText(String htmlText) {
        this.htmlText = htmlText;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsTab clsTab = (ClsTab) o;
        return Objects.equals(id, clsTab.id) && Objects.equals(name, clsTab.name) && Objects.equals(code, clsTab.code) && Objects.equals(htmlText, clsTab.htmlText);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, code, htmlText);
    }
}