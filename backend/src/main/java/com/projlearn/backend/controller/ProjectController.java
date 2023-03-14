package com.projlearn.backend.controller;

import com.projlearn.backend.entity.Project;
import com.projlearn.backend.services.ProjectService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("projects")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping
  public ResponseEntity<List<Project>> getAllProjects() {
    return ResponseEntity.ok(projectService.getAllProjects());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Project> getProjectById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(projectService.findById(id));
  }

  @GetMapping("/{title}")
  public ResponseEntity<Project> getProjectByTitle(@PathVariable("title") String title) {
    return ResponseEntity.ok(projectService.findByTitle(title));
  }
}
