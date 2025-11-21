package twilight.sparkle.crm.modules.users;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.roles.Roles;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long userId;

  @NonNull
  private String username;
  @NonNull
  private String password;
  @NonNull
  private String email;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "roleId")
  private Roles role;
}