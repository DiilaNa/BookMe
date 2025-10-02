package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.entity.Events;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final EventsService eventsService;

    @GetMapping("/loadEvents")
    public ResponseEntity<ApiResponseDto> getAllEvents() {
        List<Events> events =  eventsService.loadAllEvents();
        return ResponseEntity.ok(new ApiResponseDto(
                200,
                "ok",
                events
        ));
    }
}
