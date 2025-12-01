package twilight.sparkle.crm.modules.contacts;

import org.springframework.web.bind.annotation.*;

import twilight.sparkle.crm.modules.companies.Company;
import twilight.sparkle.crm.modules.companies.CompanyService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
  private final CompanyService companyService;
  private final ContactService contactService;

  public ContactController(CompanyService companyService, ContactService contactService) {
    this.companyService = companyService;
    this.contactService = contactService;
  }

  @GetMapping
  public List<Contact> getAll() {
    return contactService.findAll();
  }

  @PostMapping
  public Contact create(@RequestBody Map<String, String> postRequest) {
    String name = postRequest.get("name");
    String email = postRequest.get("email");
    String phone = postRequest.get("phone");
    String position = postRequest.get("position");
    String company = postRequest.get("company");
    Company companyE = companyService.findByName(company);
    if(companyE != null) return contactService.save(new Contact(name, email, phone, position, companyE));
    else throw new RuntimeException(company+" > Company does not exit!\n"+postRequest);
  }
}