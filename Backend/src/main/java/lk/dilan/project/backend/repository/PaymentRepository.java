package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Payments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<Payments,String> {
}
