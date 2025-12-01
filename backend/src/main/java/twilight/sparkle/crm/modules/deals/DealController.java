package twilight.sparkle.crm.modules.deals;

import org.springframework.web.bind.annotation.*;

import twilight.sparkle.crm.modules.users.User;
import twilight.sparkle.crm.modules.users.UserService;
import twilight.sparkle.crm.modules.companies.Company;
import twilight.sparkle.crm.modules.companies.CompanyService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deals")
public class DealController {
  private final UserService userService;
  private final CompanyService companyService;
  private final DealService dealService;

  public DealController(UserService userService, CompanyService companyService, DealService dealService) {
    this.userService = userService;
    this.companyService = companyService;
    this.dealService = dealService;
  }

  @GetMapping
  public List<Deal> getAll() {
    return dealService.findAll();
  }

  @PostMapping
  public Deal create(@RequestBody Map<String, String> postRequest) {
    String stage = postRequest.get("stage");
    Integer amount = Integer.parseInt(postRequest.get("amount"));
    Integer chance = Integer.parseInt(postRequest.get("chance"));
    String closeDate = postRequest.get("closeDate");
    String user = postRequest.get("user");
    String company = postRequest.get("company");
    User userE = userService.findByName(user);
    Company companyE = companyService.findByName(company);
    if(userE == null) throw new RuntimeException(company+" > Company does not exit!\n"+postRequest);
    if(companyE == null) throw new RuntimeException(company+" > Company does not exit!\n"+postRequest);
    return dealService.save(new Deal(stage, amount, chance, closeDate, userE, companyE));
  }
}