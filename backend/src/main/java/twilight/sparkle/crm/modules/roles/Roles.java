package twilight.sparkle.crm.modules.roles;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Roles {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long roleId;
  @NonNull
  private String name;
}