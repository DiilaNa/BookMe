package lk.dilan.project.backend.dto.login;

import lk.dilan.project.backend.entity.enums.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String accessToken;
    private String refreshToken;
    private Long userId;
    private String username;
    private String role;
    private AccountStatus status;
}
