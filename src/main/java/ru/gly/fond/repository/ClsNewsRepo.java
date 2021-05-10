package ru.gly.fond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.gly.fond.model.ClsNews;
import ru.gly.fond.model.RegNewsFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClsNewsRepo extends JpaRepository<ClsNews, Long> {

    @Query( nativeQuery = true,
            value = "SELECT *\n" +
                    "FROM cls_news\n" +
                    "WHERE start_time <= :start_time\n" +
                    "ORDER BY start_time DESC\n" +
                    "LIMIT 4;"
    )
    List<ClsNews> find4LastNews(@Param(value = "start_time") Date startTime);

    @Query(nativeQuery = true,
            value = "SELECT * FROM cls_news WHERE start_time <= :start_time ORDER BY start_time DESC")
    List<ClsNews> findNews(@Param(value = "start_time") Date startTime);

    Optional<ClsNews> findByHashId(String hashId);
}