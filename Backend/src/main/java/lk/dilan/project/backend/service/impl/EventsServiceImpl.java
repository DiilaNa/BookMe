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

import java.util.ArrayList;
import java.util.List;

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
}
