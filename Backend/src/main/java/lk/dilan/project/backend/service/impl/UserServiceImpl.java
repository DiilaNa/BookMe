package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.login.SignUpDTO;
import lk.dilan.project.backend.repository.UserRepository;
import lk.dilan.project.backend.service.UserService;
import lk.dilan.project.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;

    @Override
    public String Register(SignUpDTO signUpDTO) {
        if (userRepository.findByUsername(signUpDTO.getUsername()).isPresent()) {
            throw new RuntimeException("username already exists");
        }
        User user = User.builder()
                .username(signUpDTO.getUsername())
                .password(passwordEncoder.encode(signUpDTO.getPassword()))
                .em(signUpDTO.getEmail())
                .role("USER") // default role
                .build();

        userRepository.save(user);
        return "";
    }
}
