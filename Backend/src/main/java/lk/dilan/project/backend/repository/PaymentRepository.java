package lk.dilan.project.backend.repository;

import lk.dilan.project.backend.entity.Payments;
import lk.dilan.project.backend.entity.enums.PaymentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends MongoRepository<Payments,String> {
    List<Payments> findByUserIdAndStatus(String userId, PaymentStatus status);
}
