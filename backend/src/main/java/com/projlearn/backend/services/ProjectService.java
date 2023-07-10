package com.projlearn.backend.services;

import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Solution;
import com.projlearn.backend.entity.Status;
import com.projlearn.backend.repository.ProjectRepository;
import com.projlearn.backend.shell.CompileCodeProcess;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ProjectService {

  private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Project saveProject(Project project) {
    return projectRepository.save(project);
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

  public ResponseEntity<String> submitProjectSolution(Integer id, String solution) {
    Optional<Project> project = projectRepository.findById(id);

    if (project.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    String titleOfProject = "temp_";
    System.out.println(titleOfProject);
    String fileName = "";

    // read from UI
    try {
      Path tempDirPath = Files.createDirectories(Paths.get("commandline/input"));

      File tempFile = File.createTempFile(titleOfProject, ".okaejlox", tempDirPath.toFile());
      fileName = tempFile.getName();
      System.out.println(tempFile.getName());
      logger.info("The temporary file has been created: {}", tempFile);

      Files.writeString(tempFile.toPath(), solution); // use this for
      // application json
      logger.info("The file has been written: {}", tempFile);

      tempFile.deleteOnExit();

    } catch (IOException e) {
      logger.error("File cannot be created");
    }

    // run interpreter
    String outFileName = "";
    try {
      outFileName = CompileCodeProcess.compileAndRunJLox(fileName, titleOfProject);
    } catch (IOException e) {
      logger.error("Cannot run command: run interpreter");
    }

    // content of interpreter result
    String outDir = "commandline/output/";
    String content = "";
    try {
      content = Files.readString(Path.of(outDir + outFileName));
    } catch (IOException e) {
    }

    if (content.contains("[line")) {
      return new ResponseEntity<>(content, HttpStatus.OK);
    }

    Solution sol = new Solution();
    sol.setSol(solution);

    project.get().addSolution(sol);
    project.get().setStatus(Status.COMPLETED);
    projectRepository.save(project.get());
    return new ResponseEntity<>(content, HttpStatus.CREATED);
  }
}
