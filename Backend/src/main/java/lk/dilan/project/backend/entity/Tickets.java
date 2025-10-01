package lk.dilan.project.backend.entity;

import lk.dilan.project.backend.entity.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "tickets")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Tickets {
    @Id
    private String id;
    private String eventId;
    private String userId;
    private String qrCode;
    private TicketStatus status;
    private String paymentId;
    private LocalDateTime purchasedAt = LocalDateTime.now();

}
