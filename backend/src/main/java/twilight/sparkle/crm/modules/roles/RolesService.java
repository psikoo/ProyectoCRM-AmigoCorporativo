package twilight.sparkle.crm.modules.roles;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
  private final RolesRepository rolesRepository;

  public RolesService(RolesRepository rolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  public List<Roles> findAll() {
    return rolesRepository.findAll();
  }

  public Roles save(Roles role) {
    return rolesRepository.save(role);
  }

  public Roles findByRoleName(String roleName) {
    return rolesRepository.findByName(roleName).orElse(null);
  }
}
