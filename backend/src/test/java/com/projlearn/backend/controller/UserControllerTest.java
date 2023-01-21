package com.projlearn.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
public class UserControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private UserService userService;

  @Test
  public void TestGetAllUsers() throws Exception {

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

    Mockito.when(userService.getAllUsers()).thenReturn(users);

    mvc.perform(get("/api/v1/users").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2));

  }

}
