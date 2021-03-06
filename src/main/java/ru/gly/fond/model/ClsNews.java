package ru.gly.fond.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "cls_news", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ClsNews {

    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "CLS_NEWS_GEN", sequenceName = "cls_news_id_seq", allocationSize = 1, schema = "public")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLS_NEWS_GEN")
    private Long id;
    private String heading;
    private String message;
    private Date startTime;
//    private Date endTime;
    private String hashId;
    private String htmlText;
    private Long idImgCover;
    private Boolean isDeleted;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "heading", nullable = false)
    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    @Basic
    @Column(name = "message")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Basic
    @Column(name = "start_time")
    @Temporal(TemporalType.TIMESTAMP)
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

//    @Basic
//    @Column(name = "end_time")
//    @Temporal(TemporalType.TIMESTAMP)
//    public Date getEndTime() {
//        return endTime;
//    }
//
//    public void setEndTime(Date endTime) {
//        this.endTime = endTime;
//    }

    @Basic
    @Column(name = "hash_id")
    public String getHashId() {
        return hashId;
    }

    public void setHashId(String hashId) {
        this.hashId = hashId;
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
    @Column(name = "id_img_cover")
    public Long getIdImgCover() {
        return idImgCover;
    }

    public void setIdImgCover(Long idImgCover) {
        this.idImgCover = idImgCover;
    }

    @Basic
    @Column(name = "is_deleted")
    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClsNews that = (ClsNews) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(heading, that.heading) &&
                Objects.equals(message, that.message) &&
                Objects.equals(startTime, that.startTime) &&
                Objects.equals(isDeleted, that.isDeleted) &&
                Objects.equals(htmlText, that.htmlText) &&
                Objects.equals(hashId, that.hashId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, heading, message, startTime,
                isDeleted,
                htmlText,
                hashId);
    }

}
