package lk.dilan.project.backend.service;

import lk.dilan.project.backend.dto.login.SignUpDTO;

public interface UserService {
    String Register(SignUpDTO signUpDTO);
}
