package lk.dilan.project.backend.dto.login;

import lk.dilan.project.backend.entity.enums.Role;
import lombok.Data;

@Data
public class SignUpDTO {
    private String id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;

}
