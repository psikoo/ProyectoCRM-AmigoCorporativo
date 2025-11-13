package twilight.sparkle.crm.entity;

import org.aspectj.lang.annotation.RequiredTypes;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NonNull
  private String username;
  @NonNull
  private String password;
  @NonNull
  private String email;
  @NonNull
  private String role;
}