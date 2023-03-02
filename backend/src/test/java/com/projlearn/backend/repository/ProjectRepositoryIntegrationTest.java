package com.projlearn.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.projlearn.backend.entity.Difficulty;
import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ProjectRepositoryIntegrationTest {

  @Autowired
  private ProjectRepository projectRepository;

  @Test
  public void whenCalledSave_thenCorrectNumberOfProjects() {
    Project project = new Project();
    project.setTitle("two-sum");
    project.setDescription("add two numbers together");
    project.setDifficulty(Difficulty.EASY);
    project.setStatus(Status.NOT_ATTEMPTED);

    projectRepository.save(project);

    List<Project> projects = projectRepository.findAll();

    assertThat(projects).hasSize(1);
  }

}