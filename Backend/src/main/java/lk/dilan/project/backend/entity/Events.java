package lk.dilan.project.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collation = "events")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Events {
    @Id
    private String id;
    private String userID;/*FK from user table*/
    private String title;
    private String description;
    private LocalDateTime date;
    private String location;
    private int totalSeats;
    private int availableSeats;
    private double price;
}
