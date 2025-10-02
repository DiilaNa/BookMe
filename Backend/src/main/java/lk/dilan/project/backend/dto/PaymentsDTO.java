package lk.dilan.project.backend.dto;

import lk.dilan.project.backend.entity.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentsDTO {
    private String id;
    private String userId;
    private String eventId;
    private double amount;
    private String paymentMethod;
    private PaymentStatus status;
    private LocalDateTime createdAt = LocalDateTime.now();
}
