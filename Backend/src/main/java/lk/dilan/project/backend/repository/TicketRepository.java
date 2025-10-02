package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Tickets;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<Tickets, String> {

}
