package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.UserSummaryDTO;

import java.util.List;

public interface UserDetailModalService {
    List<UserSummaryDTO> getAllUserSummaries(String keyword);
}
