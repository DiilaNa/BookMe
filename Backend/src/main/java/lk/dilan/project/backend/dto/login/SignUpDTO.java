package lk.dilan.project.backend.dto.login;

import lombok.Data;

@Data
public class SignUpDTO {
    private String id;
    private String username;
    private String password;
    private String email;
    private String phone;

}
