package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.gly.fond.dto.NewsMainPage;
import ru.gly.fond.model.ClsNews;

import java.util.List;

@Repository
public interface ClsNewsRepo extends JpaRepository<ClsNews, Long> {

    @Query( nativeQuery = true,
            value = "SELECT *\n" +
                    "FROM cls_news\n" +
                    "ORDER BY start_time DESC\n" +
                    "LIMIT 4;"
    )
    List<ClsNews> find4LastNews();
}