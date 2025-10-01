package lk.dilan.project.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import lk.dilan.project.backend.dto.login.ApiResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponseDto handleUserNameNotFoundException(UsernameNotFoundException e) {
        return new ApiResponseDto(404, "User not found", null);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponseDto handleBadCredentialsException(BadCredentialsException e) {
        return new ApiResponseDto(400, "Bad credentials", null);
    }

    //    handle JWT token expire errors
    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseDto handleJWTTokenExpireException(Exception e) {
        return new ApiResponseDto(401, "JWT token expired", null);
    }

    //    handle all exceptions
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponseDto handleAllException(RuntimeException e) {
        return new ApiResponseDto(500, "Internal Server Error", e.getMessage());
    }
}