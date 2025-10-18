package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import java.util.Comparator;
import lk.dilan.project.backend.service.EventsService;
import lk.dilan.project.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final EventsService eventsService;
    private final PaymentService paymentService;

    @GetMapping("/loadEvents")
    public ResponseEntity<ApiResponseDto> getAllEvents() {
        List<EventsDTO> events =  eventsService.loadAllEvents();
        events.sort(Comparator.comparing(EventsDTO::getDate).reversed());
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                events
        ));
    }

    @PostMapping("/processPayment")
    public ResponseEntity<ApiResponseDto> processPayment(@RequestBody PaymentsDTO paymentsDTO){
        System.out.println(paymentsDTO);
        paymentService.processPayment(paymentsDTO);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                "Payment Saved"
        ));
    }
    @GetMapping("/purchasedEvents/{userId}")
    public ResponseEntity<ApiResponseDto> getPurchasedEventIds(@PathVariable String userId) {
        List<PaymentsDTO> eventIds = paymentService.getPurchasedEventIds(userId);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                eventIds
        ));
    }

}
