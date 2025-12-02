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

  public Contact setName(String value) { this.name = value; return this; };
  public Contact setEmail(String value) { this.email = value; return this; };
  public Contact setPhone(String value) { this.phone = value; return this; };
  public Contact setPosition(String value) { this.position = value; return this; };
  public Contact setCompany(Company value) { this.company = value; return this; };
}