package com.projlearn.backend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.projlearn.backend.entity.User;
import com.projlearn.backend.services.UserService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(UserController.class)
public class UserControllerTest {

  @MockBean
  private UserService userService;

  private MockMvc mvc;

  public UserControllerTest(MockMvc mvc) {
    this.mvc = mvc;
  }

  @Test
  public void getAllUsers() throws Exception {

    User user = new User();
    user.setFirstName("Leon");
    user.setLastName("Rai");
    user.setEmail("test@gmail.com");

    User user2 = new User();
    user.setFirstName("Anna");
    user.setLastName("Tee");
    user.setEmail("test2@gmail.com");

    List<User> users = new ArrayList<>();
    users.add(user);
    users.add(user2);

    when(userService.getAllUsers()).thenReturn(users);

    mvc.perform(get("/api/user").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2));

  }

}
