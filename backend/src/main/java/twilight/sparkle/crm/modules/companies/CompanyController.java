package twilight.sparkle.crm.modules.companies;

import org.springframework.web.bind.annotation.*;

import twilight.sparkle.crm.modules.users.User;
import twilight.sparkle.crm.modules.users.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
  private final UserService userService;
  private final CompanyService companyService;

  public CompanyController(UserService userService, CompanyService companyService) {
    this.userService = userService;
    this.companyService = companyService;
  }

  @GetMapping
  public List<Company> getAll() {
    return companyService.findAll();
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    companyService.delete(id);
  }

  @PostMapping
  public Company create(@RequestBody Map<String, String> postRequest) {
    String id = postRequest.get("id");
    String name = postRequest.get("name");
    String industry = postRequest.get("industry");
    String website = postRequest.get("website");
    String phone = postRequest.get("phone");
    String address = postRequest.get("address");
    String user = postRequest.get("user");
    User userE = userService.findByName(user);
    
    if(userE == null) throw new RuntimeException(user+" > User does not exit!\n"+postRequest);
    if(id == null) return companyService.save(new Company(name, industry, website, phone, address, userE));
    return companyService.save(
      companyService.findById(Long.parseLong(id))
        .setName(name)
        .setIndustry(industry)
        .setWebsite(website)
        .setPhone(phone)
        .setAddress(address)
        .setUser(userE)
    ); 
  }
}