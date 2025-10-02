package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.entity.Tickets;
import lk.dilan.project.backend.entity.enums.TicketStatus;
import lk.dilan.project.backend.repository.TicketRepository;
import lk.dilan.project.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    @Override
    public Tickets createTicket(PaymentsDTO paymentsDTO) {
        try {
            String qrContent = "EVENT:" + paymentsDTO.getEventId() + "|USER:" + paymentsDTO.getUserId() + "|PAYMENT:" + paymentsDTO.getId();
            String qrPath = "tickets/" + paymentsDTO.getId() + ".png";
            //QRCodeGenerator.generateQRCodeImage(qrContent, 300, 300, qrPath);

            Tickets ticket = new Tickets();
            ticket.setEventId(paymentsDTO.getEventId());
            ticket.setUserId(paymentsDTO.getUserId());
            ticket.setPaymentId(paymentsDTO.getId());
            ticket.setQrCode(qrPath);
            ticket.setStatus(TicketStatus.ACTIVE);

            return ticketRepository.save(ticket);
        } catch (Exception e) {
            throw new RuntimeException("Error generating ticket QR code", e);
        }
    }
}
