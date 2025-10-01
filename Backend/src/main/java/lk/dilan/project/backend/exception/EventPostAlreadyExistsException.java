package lk.dilan.project.backend.exception;

public class EventPostAlreadyExistsException extends RuntimeException {
    public EventPostAlreadyExistsException(String message) {
        super(message);
    }
}
