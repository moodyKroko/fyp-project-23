package com.projlearn.backend.controller;

import com.projlearn.backend.entity.Difficulty;import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;import com.projlearn.backend.services.ProjectService;
import java.util.List;
import java.util.Optional;import javax.swing.text.html.Option;import org.springframework.http.HttpStatus;import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;import org.springframework.web.bind.annotation.RequestBody;import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping("/projects")
  public ResponseEntity<List<Project>> getAllProjects() {
    return ResponseEntity.ok(projectService.getAllProjects());
  }

  @GetMapping("/project/{id}")
  public ResponseEntity<Project> getProjectById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(projectService.findById(id));
  }

  @GetMapping("/project")
  public ResponseEntity<Project> getProjectByTitle(@RequestParam("title") String title) {
    return ResponseEntity.ok(projectService.findByTitle(title));
  }

  @PostMapping("/project/add")
  public ResponseEntity<Project> submitProject(@RequestBody Project project) {
      Project newProject = new Project();
      newProject.setDescription(project.getDescription());
      newProject.setTitle(project.getTitle());
      newProject.setDifficulty(project.getDifficulty());
      newProject.setStatus(project.getStatus());

      return new ResponseEntity<>(projectService.saveProject(newProject), HttpStatus.CREATED);
  }

}
