package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.entity.Events;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface EventsService {
    void saveEvent(EventsDTO eventsDTO, MultipartFile file) throws IOException;

    List<EventsDTO> getAllMyEvents(String userID);

    void updateEvent(EventsDTO eventsDTO,MultipartFile file) throws IOException;

    List<EventsDTO> searchEvents(String email);

    List<Events> loadAllEvents();
}
