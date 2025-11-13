package twilight.sparkle.crm.config;

import twilight.sparkle.crm.entity.User;
import twilight.sparkle.crm.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
    String username = loginRequest.get("username");
    String password = loginRequest.get("password");
    User user = userService.findByUsername(username);
    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
      String token = jwtService.generateToken(username);
      return Map.of("token", token);
    } else {
      throw new RuntimeException("Invalid credentials");
    }
  }
}
