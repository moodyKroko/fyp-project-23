package com.projlearn.backend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.github.javafaker.Faker;
import com.projlearn.backend.entity.Difficulty;
import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import com.projlearn.backend.services.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {

  @Autowired private MockMvc mvc;

  @MockBean private ProjectService projectService;

  @Test
  public void shouldGetProjectById() throws Exception {
    Faker faker = new Faker();

    Project project = new Project();
    project.setTitle(faker.lorem().characters(3, 10, false, false));
    project.setDescription(faker.lorem().sentence(10));
    project.setStatus(Status.COMPLETED);
    project.setDifficulty(Difficulty.MEDIUM);
    project.setID(9);

    when(projectService.findById(9)).thenReturn(project);

    mvc.perform(get("/projects/9").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(9));
  }
}
