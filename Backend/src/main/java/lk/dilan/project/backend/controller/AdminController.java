package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final EventsService eventsService;

    @PostMapping("/saveEvent")
    public ResponseEntity<ApiResponseDto> saveEvent(@RequestBody EventsDTO eventsDTO){
        eventsService.saveEvent(eventsDTO);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                "Event's post Saved"
        ));
    }

    @GetMapping("/getMyEvents/{userId}")
    public ResponseEntity<ApiResponseDto> getMyEvents(@PathVariable String userId){
        List<EventsDTO> eventsDTOS = eventsService.getAllMyEvents(userId);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                eventsDTOS
        ));
    }
}
