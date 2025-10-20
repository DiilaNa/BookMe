package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.UserSummaryDTO;
import lk.dilan.project.backend.service.UserDetailModalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userDetails")
public class UserDetailsModalController {
    private final UserDetailModalService userDetailModalService;

    @GetMapping("/user-details")
    public List<UserSummaryDTO> getUserDetails(@RequestParam(required = false) String keyword) {
        return userDetailModalService.getAllUserSummaries(keyword);
    }
}
