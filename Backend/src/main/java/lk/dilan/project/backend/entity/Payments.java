package lk.dilan.project.backend.entity;

import lk.dilan.project.backend.entity.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payments {
    @Id
    private String id;
    private String ticketId;
    private String userId;
    private double amount;
    private String paymentMethod;
    private PaymentStatus status;
/*
    private String transactionId; // reference from Stripe/PayPal
*/
    private LocalDateTime createdAt = LocalDateTime.now();
}
