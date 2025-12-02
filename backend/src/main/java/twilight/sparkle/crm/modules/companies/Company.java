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

  public Company setName(String value) { this.name = value; return this; };
  public Company setIndustry(String value) { this.industry = value; return this; };
  public Company setWebsite(String value) { this.website = value; return this; };
  public Company setPhone(String value) { this.phone = value; return this; };
  public Company setAddress(String value) { this.address = value; return this; };
  public Company setUser(User value) { this.user = value; return this; };
}