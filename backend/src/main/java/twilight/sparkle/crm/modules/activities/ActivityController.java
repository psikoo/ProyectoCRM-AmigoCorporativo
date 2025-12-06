package twilight.sparkle.crm.modules.activities;

import org.springframework.web.bind.annotation.*;

import twilight.sparkle.crm.modules.users.User;
import twilight.sparkle.crm.modules.users.UserService;
import twilight.sparkle.crm.modules.companies.Company;
import twilight.sparkle.crm.modules.companies.CompanyService;
import twilight.sparkle.crm.modules.contacts.Contact;
import twilight.sparkle.crm.modules.contacts.ContactService;
import twilight.sparkle.crm.modules.deals.Deal;
import twilight.sparkle.crm.modules.deals.DealService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
  private final UserService userService;
  private final DealService dealService;
  private final ContactService contactService;
  private final CompanyService companyService;
  private final ActivityService activityService;

  public ActivityController(UserService userService, DealService dealService, ContactService contactService, CompanyService companyService, ActivityService activityService) {
    this.userService = userService;
    this.dealService = dealService;
    this.contactService = contactService;
    this.companyService = companyService;
    this.activityService = activityService;
  }

  @GetMapping
  public List<Activity> getAll() {
    return activityService.findAll();
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    activityService.delete(id);
  }

  @PostMapping
  public Activity create(@RequestBody Map<String, String> postRequest) {
    String id = postRequest.get("id");
    String name = postRequest.get("name");
    String description = postRequest.get("description");
    String dueDate = postRequest.get("dueDate");
    String company = postRequest.get("company");
    String contact = postRequest.get("contact");
    String deal = postRequest.get("deal");
    String user = postRequest.get("user");
    Company companyE = companyService.findFirstByName(company);
    Contact contactE = contactService.findFirstByName(contact);
    Deal dealE = dealService.findById(Long.parseLong(deal));
    User userE = userService.findFirstByName(user);
    if(companyE == null) throw new RuntimeException(company+" > Company does not exit!\n"+postRequest);
    if(contactE == null) throw new RuntimeException(company+" > Contact does not exit!\n"+postRequest);
    if(dealE == null) throw new RuntimeException(company+" > Deal does not exit!\n"+postRequest);
    if(userE == null) throw new RuntimeException(company+" > User does not exit!\n"+postRequest);
    if(id == null) return activityService.save(new Activity(name, description, dueDate, companyE, contactE, dealE, userE));
    return activityService.save(
      activityService.findById(Long.parseLong(id))
        .setName(name)
        .setDescription(description)
        .setDueDate(dueDate)
        .setCompany(companyE)
        .setContact(contactE)
        .setDeal(dealE)
        .setUser(userE)
    ); 
  }
}