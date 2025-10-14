package lk.dilan.project.backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encoder {
    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("admin123"));

    }
}
