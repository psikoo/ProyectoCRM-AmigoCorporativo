package twilight.sparkle.crm.modules.roles;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @PostMapping
  public Role create(@RequestBody Role role) {
    return rolesService.save(role);
  }
}