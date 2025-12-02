package twilight.sparkle.crm.modules.roles;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
  private final RoleService rolesService;

  public RoleController(RoleService rolesService) {
    this.rolesService = rolesService;
  }

  @GetMapping
  public List<Role> getAll() {
    return rolesService.findAll();
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    rolesService.delete(id);
  }

  @PostMapping
  public Role create(@RequestBody Map<String, String> postRequest) {
    String id = postRequest.get("id");
    String name = postRequest.get("name");

    if(id == null) return rolesService.save(new Role(name));
    return rolesService.save(
      rolesService.findById(Long.parseLong(id))
        .setName(name)
    ); 
  }
}