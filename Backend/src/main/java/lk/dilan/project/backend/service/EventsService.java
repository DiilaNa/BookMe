package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.EventsDTO;

import java.util.List;

public interface EventsService {
    void saveEvent(EventsDTO eventsDTO);

    List<EventsDTO> getAllMyEvents(String userId);

    void updateEvent(EventsDTO eventsDTO);
}
