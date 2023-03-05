package com.projlearn.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.github.javafaker.Faker;
import com.projlearn.backend.entity.User;
import com.projlearn.backend.services.UserService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean private UserService userService;

  @Test
  void shouldInsertUsers_thenFindAllUsers() throws Exception {
    Faker faker = new Faker();

    List<User> users = new ArrayList<>();

    StringBuilder firstName = new StringBuilder();
    StringBuilder lastName = new StringBuilder();
    StringBuilder email = new StringBuilder();

    int userCount = 3;
    for (int i = 0; i < userCount; i++) {
      firstName.append(faker.name().firstName());
      lastName.append(faker.name().lastName());
      email.append(String.format("%s.%s@gmail.com", firstName, lastName));

      User newUser = new User();
      newUser.setFirstName(firstName.toString());
      newUser.setLastName(lastName.toString());
      newUser.setEmail(email.toString());

      users.add(newUser);
    }

    Mockito.when(userService.getAllUsers()).thenReturn(users);

    mvc.perform(get("/users").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(userCount));
  }
}
