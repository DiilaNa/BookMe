package lk.dilan.project.backend.service.impl;

import lk.dilan.project.backend.dto.login.LoginDto;
import lk.dilan.project.backend.dto.login.LoginResponseDTO;
import lk.dilan.project.backend.dto.login.SignUpDTO;
import lk.dilan.project.backend.entity.User;
import lk.dilan.project.backend.entity.enums.AccountStatus;
import lk.dilan.project.backend.entity.enums.Role;
import lk.dilan.project.backend.repository.UserRepository;
import lk.dilan.project.backend.service.UserService;
import lk.dilan.project.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        if (userRepository.findByName(signUpDTO.getUsername()).isPresent()) {
            throw new RuntimeException("username already exists");
        }
        User user = User.builder()
                .name(signUpDTO.getUsername())
                .password(passwordEncoder.encode(signUpDTO.getPassword()))
                .role(Role.USER)
                .email(signUpDTO.getEmail())
                .phone(signUpDTO.getPhone())
                .status(AccountStatus.ACTIVE)
                .build();

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Override
    public LoginResponseDTO authenticate(LoginDto loginDTO) {
        User user = userRepository.findByName(loginDTO.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Name not Found"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid Credentials");
        }
        String token  = jwtUtil.generateToken(loginDTO.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(loginDTO.getUsername());

        return new LoginResponseDTO(
                user.getId(),
                token,
                refreshToken,
                user.getName(),
                user.getRole(),
                user.getStatus()

        );
    }
}
