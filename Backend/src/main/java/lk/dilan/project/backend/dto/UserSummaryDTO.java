package lk.dilan.project.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSummaryDTO {
    private String id;
    private String name;
    private String email;
    private String phone;
    private long ticketCount;
    private double totalPayments;
    private String paymentStatus;
    private String eventNames;
}

