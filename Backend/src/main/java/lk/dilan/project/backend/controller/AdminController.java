package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @PutMapping(value = "/updateEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDto> updateEvent(@RequestPart("event") EventsDTO eventsDTO, @RequestPart( "file")MultipartFile file) throws IOException {
        eventsService.updateEvent(eventsDTO,file);
       return ResponseEntity.ok(new ApiResponseDto(
               200,
               "ok",
               "Updated Successfully"
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
}
