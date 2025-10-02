package lk.dilan.project.backend.service.impl;

import jakarta.mail.internet.MimeMessage;
import lk.dilan.project.backend.entity.Tickets;
import lk.dilan.project.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    public void sendTicketEmail(String to, Tickets ticket, byte[] qrBytes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("🎟 Your Ticket is Confirmed!");
            String htmlContent = "<h3>Payment Successful!</h3>" +
                    "<p>Here is your ticket for event <b>" + ticket.getEventId() + "</b></p>" +
                    "<p>Please find your QR code attached for entry.</p>";

            helper.setText(htmlContent, true);

            helper.addAttachment("ticket-" + ticket.getId() + ".png", new ByteArrayResource(qrBytes));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send ticket email", e);
        }
    }
}
