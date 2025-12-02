package twilight.sparkle.crm.modules.activities;

import jakarta.persistence.*;
import lombok.*;
import twilight.sparkle.crm.modules.companies.Company;
import twilight.sparkle.crm.modules.contacts.Contact;
import twilight.sparkle.crm.modules.deals.Deal;
import twilight.sparkle.crm.modules.users.User;

@Entity
@Table(name = "activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Activity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long activityId;

  @NonNull
  private String name;
  @NonNull
  private String description;
  @NonNull
  private String dueDate;
  
  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "company_id")
  private Company company;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "contact_id")
  private Contact contact;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "deal_id")
  private Deal deal;

  @NonNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;


  public Activity setName(String value) { this.name = value; return this; };
  public Activity setDescription(String value) { this.description = value; return this; };
  public Activity setDueDate(String value) { this.dueDate = value; return this; };
  public Activity setCompany(Company value) { this.company = value; return this; };
  public Activity setContact(Contact value) { this.contact = value; return this; };
  public Activity setDeal(Deal value) { this.deal = value; return this; };
  public Activity setUser(User value) { this.user = value; return this; };
}