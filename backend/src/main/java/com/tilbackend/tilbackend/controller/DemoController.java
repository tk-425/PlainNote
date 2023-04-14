package com.tilbackend.tilbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/app")
public class DemoController {

  @GetMapping(path = "/test")
  public String test(Principal principal) {
    System.out.println(principal.getName());
    return principal.getName();
  }
}
