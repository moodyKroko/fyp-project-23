package com.projlearn.backend.repository;

import com.projlearn.backend.entity.Project;
import com.projlearn.backend.entity.Status;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

  Project findProjectByStatus(Status status);

//  @Query("SELECT project FROM Project project WHERE project.id =:id")
  Optional<Project> findById(@Param("id") Integer id);

//  @Query("SELECT project FROM Project project WHERE project.title =:title")
  Optional<Project> findByTitle(@Param("title") String title);
}
