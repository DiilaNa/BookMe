package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.PaymentsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.entity.Events;
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
        List<Events> events =  eventsService.loadAllEvents();
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                events
        ));
    }

    @PostMapping("/savePayment")
    public ResponseEntity<ApiResponseDto> savePayment(@RequestBody PaymentsDTO paymentsDTO){
        paymentService.savePayment(paymentsDTO);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                "Payment Saved"
        ));
    }
}
