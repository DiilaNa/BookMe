package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final EventsService eventsService;

    @PostMapping(value = "/saveEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDto> saveEvent(@RequestPart("event") EventsDTO eventsDTO, @RequestPart("file") MultipartFile file) throws IOException {
        eventsService.saveEvent(eventsDTO,file);

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

    @PutMapping("/updateEvent/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable String id, @RequestPart("event") EventsDTO eventsDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            if (file != null && !file.isEmpty()) {
               log.info("file is empty");
                eventsDTO.setEventImageBase64(Base64.getEncoder().encodeToString(file.getBytes()));
                eventsDTO.setImageName(file.getOriginalFilename());
            }
            log.info("update event");
            eventsDTO.setId(id);
            eventsService.updateEvent(eventsDTO);
            return ResponseEntity.ok("Event updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating event: " + e.getMessage());
        }
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
