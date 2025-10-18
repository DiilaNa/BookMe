package lk.dilan.project.backend.service.impl;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.entity.Payments;
import lk.dilan.project.backend.entity.Tickets;
import lk.dilan.project.backend.entity.User;
import lk.dilan.project.backend.entity.enums.TicketStatus;
import lk.dilan.project.backend.repository.TicketRepository;
import lk.dilan.project.backend.repository.UserRepository;
import lk.dilan.project.backend.service.EmailService;
import lk.dilan.project.backend.service.TicketService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.Base64;


@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    @Override
    @Transactional
    public Tickets createTicket(Payments paymentsDTO) {
        try {
            // 1️⃣ Generate QR code as bytes
            String qrContent = "EVENT:" + paymentsDTO.getEventId() + "|USER:" + paymentsDTO.getUserId() + "|PAYMENT:" + paymentsDTO.getId();
            byte[] qrBytes = generateQRCodeBytes(qrContent, 300, 300);
            String qrBase64 = Base64.getEncoder().encodeToString(qrBytes);

            // 2️⃣ Save ticket in DB
            Tickets ticket = new Tickets();
            ticket.setEventId(paymentsDTO.getEventId());
            ticket.setUserId(paymentsDTO.getUserId());
            ticket.setPaymentId(paymentsDTO.getId());
            ticket.setQrCode(qrBase64); // store QR as Base64
            ticket.setStatus(TicketStatus.ACTIVE);

            User user = userRepository.findById(paymentsDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found for ticket"));
            String email = user.getEmail();

            Tickets savedTicket = ticketRepository.save(ticket);

//            // 3️⃣ Send email with QR as attachment
//            emailService.sendTicketEmail(email, savedTicket, qrBytes);
            System.out.println("Email sending is currently disabled but will be sent to " + email +  "correctly");

            return savedTicket;

        } catch (Exception e) {
            throw new RuntimeException("Error generating ticket or sending email", e);
        }
    }

    // --- QR code generator inline ---
    private byte[] generateQRCodeBytes(String text, int width, int height) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
        return baos.toByteArray();
    }
}
