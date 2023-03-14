package com.projlearn.backend.services;

import com.projlearn.backend.entity.Project;
import com.projlearn.backend.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class ProjectService {

  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Project findById(Integer id) {
    Optional<Project> project = projectRepository.findById(id);
    return project.orElseGet(Project::new);
  }

  public Project findByStatus(String status) {
    // do it if its necessary ??
    //    Optional<Project> project = projectRepository.findProjectByStatus();
    return new Project();
  }

  public Project findByDifficulty(String difficulty) {
    return new Project();
  }

  public Project findByTitle(String title) {
    Optional<Project> project = projectRepository.findByTitle(title);
    return project.orElseGet(Project::new);
  }

  public Project submitProjectSolution(Project project) {
    // TODO: integrate interpreter with the web app

    return new Project();
  }
}
