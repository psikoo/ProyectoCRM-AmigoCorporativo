package twilight.sparkle.crm.modules.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
  private final UsersRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UsersService(UsersRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    //save(new Users("a", "womp", "a")); //TODO it errors if no role
  }

  public List<Users> findAll() {
    return userRepository.findAll();
  }

  public Users save(Users user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public Users findByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
  }
}
