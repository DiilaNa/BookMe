package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    public ResponseEntity<ApiResponseDto> getMyEvents(@PathVariable("userId") String userID){
        List<EventsDTO> eventsDTOS = eventsService.getAllMyEvents(userID);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                eventsDTOS
        ));
    }

    @PostMapping("/updateEvent")
    public ResponseEntity<ApiResponseDto> updateEvent(@RequestBody EventsDTO eventsDTO){
        eventsService.updateEvent(eventsDTO);
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                "Event's post Saved"
        ));
    }



    @GetMapping("/search")
    public List<EventsDTO> searchEvents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return eventsService.searchEvents(keyword, location, startDate, endDate);
    }
}
