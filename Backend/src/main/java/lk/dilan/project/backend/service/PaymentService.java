package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.PaymentsDTO;

public interface PaymentService {
    PaymentsDTO savePayment(PaymentsDTO paymentsDTO);
}
