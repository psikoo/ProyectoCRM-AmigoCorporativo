package twilight.sparkle.crm.modules.users;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public List<User> getAll() {
    return userService.findAll();
  }
  @GetMapping("/{name}")
  public User getByName(@PathVariable String name) {
    return userService.findByName(name);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    userService.delete(id);
  }

  @PostMapping
  public User create(@RequestBody User user) {
    return userService.save(user);
  }
}