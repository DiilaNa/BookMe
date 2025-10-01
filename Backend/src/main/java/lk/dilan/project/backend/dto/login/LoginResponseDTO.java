package lk.dilan.project.backend.dto.login;

import lk.dilan.project.backend.entity.enums.AccountStatus;
import lk.dilan.project.backend.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String userId;
    private String accessToken;
    private String refreshToken;
    private String username;
    private Role role;
    private AccountStatus status;
}
