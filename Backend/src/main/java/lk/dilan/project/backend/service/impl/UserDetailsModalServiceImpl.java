package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.UserSummaryDTO;
import lk.dilan.project.backend.entity.Events;
import lk.dilan.project.backend.entity.Payments;
import lk.dilan.project.backend.entity.Tickets;
import lk.dilan.project.backend.entity.User;
import lk.dilan.project.backend.repository.EventsRepository;
import lk.dilan.project.backend.repository.PaymentRepository;
import lk.dilan.project.backend.repository.TicketRepository;
import lk.dilan.project.backend.repository.UserRepository;
import lk.dilan.project.backend.service.UserDetailModalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsModalServiceImpl implements UserDetailModalService {
    private final UserRepository userRepo;
    private final TicketRepository ticketRepo;
    private final PaymentRepository paymentRepo;
    private final EventsRepository eventRepo;

    @Override
    public List<UserSummaryDTO> getAllUserSummaries(String keyword) {
        List<User> users = (keyword == null || keyword.isEmpty())
                ? userRepo.findAll()
                : userRepo.findByEmailContainingIgnoreCase(keyword);

        return users.stream().map(u -> {
            List<Tickets> tickets = ticketRepo.findByUserId(u.getId());
            List<Payments> payments = paymentRepo.findByUserId(u.getId());

            double totalPayments = payments.stream().mapToDouble(Payments::getAmount).sum();
            String paymentStatus = payments.isEmpty()
                    ? "No Payments"
                    : payments.get(0).getStatus().name();

            List<String> eventNames = tickets.stream()
                    .map(t -> eventRepo.findById(t.getEventId())
                            .map(Events::getTitle)
                            .orElse("Unknown Event"))
                    .distinct()
                    .collect(Collectors.toList());

            return new UserSummaryDTO(
                    u.getId(),
                    u.getUsername(),
                    u.getEmail(),
                    u.getPhone(),
                    tickets.size(),
                    totalPayments,
                    paymentStatus,
                    String.join(", ", eventNames)
            );
        }).collect(Collectors.toList());
    }
}
