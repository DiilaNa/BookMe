package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Events;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventsRepository extends MongoRepository<Events, String> {
    List<Events> getAllByUserID(String userID);

    @Query("{ $and: [ " +
            "{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { 'description': { $regex: ?0, $options: 'i' } } ] }, " +
            "{ 'location': { $regex: ?1, $options: 'i' } }, " +
            "{ 'date': { $gte: ?2, $lte: ?3 } } " +
            "] }")
    List<Events> searchEvents(String keyword);

}
