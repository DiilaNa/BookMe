package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.PaymentsDTO;

import java.util.List;

public interface PaymentService {
    PaymentsDTO processPayment(PaymentsDTO paymentsDTO);

    List<PaymentsDTO> getPurchasedEventIds(String userId);
}
