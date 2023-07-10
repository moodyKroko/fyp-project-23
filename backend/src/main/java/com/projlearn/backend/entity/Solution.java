package com.projlearn.backend.entity;

import com.projlearn.backend.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "solutions")
public class Solution extends BaseModel {

  @Column(length = 1500)
  private String sol;

  public String getSol() {
    return sol;
  }

  public void setSol(String sol) {
    this.sol = sol;
  }

  @Override
  public String toString() {
    return "Solution{" + "sol='" + sol + '\'' + '}';
  }
}
