package com.projlearn.backend.services;

import com.projlearn.backend.entity.User;
import com.projlearn.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class UserService {

  private final UserRepository userRepo;

  public UserService(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  public User getUserById(Long id) {
    Optional<User> user = userRepo.findById(id);
    // TODO: throw error instead of sending empty User
    return user.orElseGet(User::new);
  }
}
