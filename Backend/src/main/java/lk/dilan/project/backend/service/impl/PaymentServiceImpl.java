package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.entity.Payments;
import lk.dilan.project.backend.entity.enums.PaymentStatus;
import lk.dilan.project.backend.repository.PaymentRepository;
import lk.dilan.project.backend.service.PaymentService;
import lk.dilan.project.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;
    private final TicketService ticketService;

    @Override
    @Transactional
    public PaymentsDTO processPayment(PaymentsDTO paymentsDTO) {
        Payments payments = modelMapper.map(paymentsDTO, Payments.class);
        payments.setStatus(PaymentStatus.SUCCESS);
        Payments payments1 = paymentRepository.save(payments);

        if (payments.getStatus() == PaymentStatus.SUCCESS) {
            ticketService.createTicket(payments1);
        }
        return modelMapper.map(payments1, PaymentsDTO.class);
    }
    @Override
    public List<PaymentsDTO> getPurchasedEventIds(String userId) {
        List<Payments> payments = paymentRepository.findByUserIdAndStatus(userId, PaymentStatus.SUCCESS);
        return payments.stream()
                .map(payment -> new PaymentsDTO(
                        payment.getId(),
                        payment.getUserId(),
                        payment.getEventId(),
                        payment.getAmount(),
                        payment.getPaymentMethod(),
                        payment.getStatus(),
                        payment.getCreatedAt()
                ))
                .toList();
    }
}
