package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.EventsDTO;
import lk.dilan.project.backend.entity.Events;
import lk.dilan.project.backend.repository.EventsRepository;
import lk.dilan.project.backend.repository.UserRepository;
import lk.dilan.project.backend.service.EventsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventsServiceImpl implements EventsService {
    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    @Transactional
    public void saveEvent(EventsDTO eventsDTO) {
        Events events = modelMapper.map(eventsDTO, Events.class);
        eventsRepository.save(events);

    }

    @Override
    @Transactional(readOnly = true)
    public List<EventsDTO> getAllMyEvents(String userId) {
         List<Events> events = eventsRepository.getAllByUserID(userId);
        return modelMapper.map(events,new TypeToken<List<EventsDTO>>(){}.getType());
    }

    @Override
    public void updateEvent(EventsDTO eventsDTO) {
        Events existingEvent = eventsRepository.findById(eventsDTO.getId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        existingEvent.setTitle(eventsDTO.getTitle());
        existingEvent.setDescription(eventsDTO.getDescription());
        existingEvent.setDate(eventsDTO.getDate());
        existingEvent.setLocation(eventsDTO.getLocation());
        existingEvent.setTotalSeats(eventsDTO.getTotalSeats());
        existingEvent.setPrice(eventsDTO.getPrice());


        eventsRepository.save(existingEvent);

    }

    @Override
    public List<EventsDTO> searchEvents(String keyword, String location, LocalDateTime startDate, LocalDateTime endDate) {
        keyword = keyword == null ? "" : keyword;
        location = location == null ? "" : location;
        if (startDate == null) startDate = LocalDateTime.of(1970,1,1,0,0);
        if (endDate == null) endDate = LocalDateTime.of(3000,1,1,0,0);

        List<Events> results = eventsRepository.searchEvents(keyword, location, startDate, endDate);
        return results.stream().map(event -> modelMapper.map(event, EventsDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<Events> loadAllEvents() {
        List<Events> events = eventsRepository.findAll();
        return modelMapper.map(events,new TypeToken<List<EventsDTO>>(){}.getType());
    }
}
