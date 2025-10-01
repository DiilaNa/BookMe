package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Events;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends MongoRepository<Events, String> {
    List<Events> getAllByUserID(String userID);
}
