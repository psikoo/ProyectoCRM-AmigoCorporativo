package twilight.sparkle.crm.modules.roles;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
  private final RoleRepository rolesRepository;

  public RoleService(RoleRepository rolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  public List<Role> findAll() {
    return rolesRepository.findAll();
  }

  public Role save(Role role) {
    return rolesRepository.save(role);
  }

  public void delete(Long id) {
    rolesRepository.deleteById(id);
  }

  public Role findById(Long id) {
    return rolesRepository.findById(id).orElse(null);
  }
  public Role findByRoleName(String roleName) {
    return rolesRepository.findByName(roleName).orElse(null);
  }
}
