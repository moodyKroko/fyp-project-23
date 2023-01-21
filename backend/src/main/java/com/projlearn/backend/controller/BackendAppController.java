package com.projlearn.backend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("dev")
@RestController
public class BackendAppController {

  @RequestMapping("/")
  public String helloWorld() {
    return "Hello World from Spring Boot";
  }

}
