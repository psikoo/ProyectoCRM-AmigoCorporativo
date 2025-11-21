package twilight.sparkle.crm.modules.roles;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolesController {
  private final RolesService rolesService;

  public RolesController(RolesService rolesService) {
    this.rolesService = rolesService;
  }

  @GetMapping
  public List<Roles> getAll() {
    return rolesService.findAll();
  }

  @PostMapping
  public Roles create(@RequestBody Roles user) {
    return rolesService.save(user);
  }
}