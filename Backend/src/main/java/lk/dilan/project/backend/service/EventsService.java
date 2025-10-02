package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.entity.Events;

import java.time.LocalDateTime;
import java.util.List;

public interface EventsService {
    void saveEvent(EventsDTO eventsDTO);

    List<EventsDTO> getAllMyEvents(String userId);

    void updateEvent(EventsDTO eventsDTO);

    List<EventsDTO> searchEvents(String keyword, String location, LocalDateTime startDate, LocalDateTime endDate);

    List<Events> loadAllEvents();
}
