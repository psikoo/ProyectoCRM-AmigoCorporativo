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

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    contactService.delete(id);
  }

  @PostMapping
  public Contact create(@RequestBody Map<String, String> postRequest) {
    String id = postRequest.get("id");
    String name = postRequest.get("name");
    String email = postRequest.get("email");
    String phone = postRequest.get("phone");
    String position = postRequest.get("position");
    String company = postRequest.get("company");
    Company companyE = companyService.findFirstByName(company);
    if(companyE == null) throw new RuntimeException(company+" > Company does not exit!\n"+postRequest);
    if(id == null) return contactService.save(new Contact(name, email, phone, position, companyE));
    return contactService.save(
      contactService.findById(Long.parseLong(id))
        .setName(name)
        .setEmail(email)
        .setPhone(phone)
        .setPosition(position)
        .setCompany(companyE)
    ); 
  }
}