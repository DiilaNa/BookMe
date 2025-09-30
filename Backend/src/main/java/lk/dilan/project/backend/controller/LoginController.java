package lk.dilan.project.backend.controller;

import lk.dilan.project.backend.dto.login.ApiResponseDto;
import lk.dilan.project.backend.dto.login.LoginDto;
import lk.dilan.project.backend.dto.login.SignUpDTO;
import lk.dilan.project.backend.service.UserService;
import lk.dilan.project.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ApiResponseDto> register(@RequestBody SignUpDTO signUpDTO) {
        return ResponseEntity.ok(
                new ApiResponseDto(
                        200,
                        "User Registered",
                        userService.Register(signUpDTO)
                )
        );
    }


}
