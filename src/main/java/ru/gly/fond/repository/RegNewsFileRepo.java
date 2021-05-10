package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.gly.fond.model.ClsNews;
import ru.gly.fond.model.RegNewsFile;

import java.util.List;
import java.util.Set;


@Repository
public interface RegNewsFileRepo extends JpaRepository<RegNewsFile, Long> {
    List<RegNewsFile> findRegNewsFileByNews_IdAndIsDeleted(long id_news, boolean deleted);

    List<RegNewsFile> findRegNewsFileByNews_IdAndIsDeletedAndIsHidden(Long idNews, Boolean isDeleted, Boolean isHidden);

    @Modifying
    @Transactional
    @Query(
            value = "UPDATE reg_news_file SET is_deleted = true WHERE id in (:newsFileIds)",
            nativeQuery = true
    )
    void updateFilesAsDeleted(Set<Long> newsFileIds);

    @Modifying
    @Transactional
    @Query(
            value = "UPDATE reg_news_file SET is_deleted = false, id_news = :newsId WHERE id in (:newsFileIds)",
            nativeQuery = true
    )
    void updateFilesAsNotDeletedAndSetNewsId(Set<Long> newsFileIds, Long newsId);

    List<RegNewsFile> findAllByNewsAndIsDeleted(ClsNews news, Boolean isDeleted);
}