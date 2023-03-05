package com.projlearn.backend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.github.javafaker.Faker;
import com.projlearn.backend.entity.Difficulty;
import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import com.projlearn.backend.services.ProjectService;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

  @Autowired private MockMvc mvc;

  @MockBean private ProjectService projectService;

  @Test
  void shouldGetAllProjects() throws Exception {
    Faker faker = new Faker();
    Random rand = new Random();

    List<Project> projects = new ArrayList<>();

    StringBuilder title = new StringBuilder();
    StringBuilder description = new StringBuilder();

    int projectCount = 15;
    for (int i = 0; i < projectCount; i++) {
      title.append(faker.lorem().characters(3, 10, false, false));
      description.append(faker.lorem().sentence(10));

      Project project = new Project();
      project.setTitle(title.toString());
      project.setDescription(description.toString());

      int randNum = rand.nextInt(3);
      if (randNum == 1) {
        project.setStatus(Status.NOT_ATTEMPTED);
        project.setDifficulty(Difficulty.MEDIUM);
      } else if (randNum == 2) {
        project.setStatus(Status.COMPLETED);
        project.setDifficulty(Difficulty.EASY);
      } else {
        project.setStatus(Status.PENDING);
        project.setDifficulty(Difficulty.HARD);
      }

      projects.add(project);
    }

    when(projectService.getAllProjects()).thenReturn(projects);

    mvc.perform(get("/projects").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(projectCount));
  }

  @Test
  void shouldGetProjectById() throws Exception {
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
