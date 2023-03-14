package com.projlearn.backend.repository;

import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

  Project findProjectByStatus(Status status);

  Optional<Project> findById(Integer id);

  Optional<Project> findByTitle(String title);
}
