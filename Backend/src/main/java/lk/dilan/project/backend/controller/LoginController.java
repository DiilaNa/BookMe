package lk.dilan.project.backend.controller;

import com.nimbusds.oauth2.sdk.TokenResponse;
import lk.dilan.project.backend.dto.login.*;
import lk.dilan.project.backend.service.UserService;
import lk.dilan.project.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenResponseDTO> refreshToken(@RequestBody TokenRequestDTO request) {
        String refreshToken = request.getRefreshToken();
        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String username = jwtUtil.extractUsername(refreshToken);
        String newAccessToken = jwtUtil.generateToken(username);

        return ResponseEntity.ok(new TokenResponseDTO(
               newAccessToken,refreshToken
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto> login(@RequestBody LoginDto loginDTO) {
        return ResponseEntity.ok(
                new ApiResponseDto(
                        200,
                        "ok",
                        userService.authenticate(loginDTO)
                )
        );
    }

}
