package twilight.sparkle.crm.modules.users;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.roles.Role;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long userId;

  @NonNull
  private String name;
  @NonNull
  private String password;
  @NonNull
  private String email;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id")
  private Role role;
}