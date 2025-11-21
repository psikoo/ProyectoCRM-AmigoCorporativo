package twilight.sparkle.crm.modules.roles;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder  
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long roleId;
  @NonNull
  private String name;
}