package twilight.sparkle.crm.modules.contacts;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.companies.Company;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Contact {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long contactId;

  @NonNull
  private String name;
  @NonNull
  private String email;
  @NonNull
  private String phone;
  @NonNull
  private String position;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "company_id")
  private Company company;
}