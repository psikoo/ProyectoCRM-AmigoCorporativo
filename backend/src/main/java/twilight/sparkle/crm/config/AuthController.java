package twilight.sparkle.crm.config;

import twilight.sparkle.crm.modules.roles.Role;
import twilight.sparkle.crm.modules.roles.RoleService;
import twilight.sparkle.crm.modules.users.User;
import twilight.sparkle.crm.modules.users.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserService userService;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.userService = userService;
    this.roleService = roleService;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
    String username = loginRequest.get("username");
    String password = loginRequest.get("password");
    User user = userService.findByUsername(username);
    if(user != null && passwordEncoder.matches(password, user.getPassword())) {
      String token = jwtService.generateToken(username);
      return Map.of("token", token);
    } else {
      throw new RuntimeException("Invalid credentials");
    }
  }

  @PostMapping("/register")
  public Map<String, String> register(@RequestBody Map<String, String> registerRequest) {
    String username = registerRequest.get("username");
    String password = registerRequest.get("password");
    String email = registerRequest.get("email");
    String role = registerRequest.get("role");

    User userE = userService.findByUsername(username);
    Role roleE = roleService.findByRoleName(role);
    if(userE != null && passwordEncoder.matches(password, userE.getPassword())) {
      String token = jwtService.generateToken(username);
      return Map.of("token", token);
    } else {
      if(roleE == null) {
        roleService.save(new Role(role));
        roleE = roleService.findByRoleName(role);
      }
      userE = new User(username, password, email, roleE);
      userService.save(userE);
      String token = jwtService.generateToken(username);
      return Map.of("token", token);
    }
  }
}
