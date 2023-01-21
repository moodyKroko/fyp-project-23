package com.projlearn.backend.entity;

import com.projlearn.backend.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.core.style.ToStringCreator;

@Entity
@Table(name = "users")
public class User extends BaseModel {

  @Column(name = "first_name")
  @NotEmpty
  private String firstName;

  @Column(name = "last_name")
  @NotEmpty
  private String lastName;

  @Column(name = "email")
  @NotEmpty
  private String email;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String toString() {
    return new ToStringCreator(this).append("id", this.getID())
        .append("firstName", this.getFirstName())
        .append("lastName", this.getLastName()).append("email", this.getEmail()).toString();
  }
}
