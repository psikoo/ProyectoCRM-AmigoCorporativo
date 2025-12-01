package twilight.sparkle.crm.modules.deals;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.companies.Company;
import twilight.sparkle.crm.modules.users.User;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Deal {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long dealId;

  @NonNull
  private String stage;
  @NonNull
  private Integer amount;
  @NonNull
  private Integer chance;
  @NonNull
  private String closeDate;
  
  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;
  
  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "company_id")
  private Company company;
}