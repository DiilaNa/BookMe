package lk.dilan.project.backend.entity;

import lk.dilan.project.backend.entity.enums.AccountStatus;
import lk.dilan.project.backend.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private Role role;
    private AccountStatus status;
}
