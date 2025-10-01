package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Events;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsRepository extends MongoRepository<Events, String> {

}
