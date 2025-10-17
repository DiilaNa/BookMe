package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.entity.Payments;
import lk.dilan.project.backend.entity.Tickets;

public interface TicketService {
    Tickets createTicket(Payments payments);
}
