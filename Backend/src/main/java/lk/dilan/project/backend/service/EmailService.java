package lk.dilan.project.backend.service;

import lk.dilan.project.backend.entity.Tickets;

public interface EmailService {

    void sendTicketEmail(String email, Tickets savedTicket, byte[] qrBytes);
}
