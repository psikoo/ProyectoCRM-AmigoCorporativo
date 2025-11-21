package twilight.sparkle.crm.modules.companies;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.users.User;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Company {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long companyId;

  @NonNull
  private String name;
  @NonNull
  private String industry;
  @NonNull
  private String website;
  @NonNull
  private String phone;
  @NonNull
  private String address;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;
}