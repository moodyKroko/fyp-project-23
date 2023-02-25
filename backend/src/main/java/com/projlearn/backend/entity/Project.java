package com.projlearn.backend.entity;

import com.projlearn.backend.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "projects")
public class Project extends BaseModel {

  @Column
  @NotEmpty
  private String title;

  @Column
  @NotEmpty
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(name = "difficulty")
  private Difficulty difficulty;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private Status status;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Difficulty getDifficulty() {
    return difficulty;
  }

  public void setDifficulty(Difficulty difficulty) {
    this.difficulty = difficulty;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "Project{" +
        "title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", difficulty=" + difficulty +
        ", status=" + status +
        '}';
  }
}
