package com.projlearn.backend;

import com.github.javafaker.Faker;
import com.projlearn.backend.entity.Difficulty;
import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import com.projlearn.backend.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(DBRunner.class);
  private final ProjectRepository projectRepository;

  public DBRunner(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  @Override
  public void run(String... args) throws Exception {

    String[] properExercies = {
      "Print \"Hello World!\"",
      "Write a function that does a sum when given two numbers.",
      "Create a method for a fibonacci sequence."
    };

    String[] exerciseDifficulty = {"Easy", "Medium", "Hard"};

    for (int i = 0; i < 3; i++) {
      Project project = new Project();
      project.setTitle(properExercies[i]);
      project.setDescription(properExercies[i]);
      project.setStatus(Status.NOT_ATTEMPTED);

      if (exerciseDifficulty[i].equals("Easy")) {
        project.setDifficulty(Difficulty.EASY);
      }

      if (exerciseDifficulty[i].equals("Medium")) {
        project.setDifficulty(Difficulty.MEDIUM);
      }

      if (exerciseDifficulty[i].equals("Hard")) {
        project.setDifficulty(Difficulty.HARD);
      }
      projectRepository.save(project);
    }

    Faker faker = new Faker();

    StringBuilder title = new StringBuilder();
    StringBuilder description = new StringBuilder();

    logger.info("--- saving projects to database ---");

    int dataCount = 45;
    int oneThirdOfDataCount = 50 / 3;
    for (int i = 0; i < dataCount; i++) {
      title.append(faker.lorem().characters(3, 10, false, false));
      description.append(faker.lorem().sentence(10));

      Project project = new Project();
      project.setTitle(title.toString());
      project.setDescription(description.toString());
      project.setStatus(Status.NOT_ATTEMPTED);

      if (i < oneThirdOfDataCount) {
        project.setDifficulty(Difficulty.EASY);
      } else if (i < (oneThirdOfDataCount + oneThirdOfDataCount)) {
        project.setDifficulty(Difficulty.MEDIUM);
      } else {
        project.setDifficulty(Difficulty.HARD);
      }

      projectRepository.save(project);

      title.delete(0, title.length());
      description.delete(0, description.length());
    }

    logger.info("--- Saved all projects to database ---");
  }
}
