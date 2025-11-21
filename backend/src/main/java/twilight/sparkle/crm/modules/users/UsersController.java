package twilight.sparkle.crm.modules.users;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
  private final UsersService userService;

  public UsersController(UsersService userService) {
    this.userService = userService;
  }

  @GetMapping
  public List<Users> getAll() {
    return userService.findAll();
  }

  @PostMapping
  public Users create(@RequestBody Users user) {
    return userService.save(user);
  }
}