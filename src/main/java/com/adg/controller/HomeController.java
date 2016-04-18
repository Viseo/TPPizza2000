package com.adg.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Edgar on 18/04/2016.
 */
@RestController
public class HomeController {

    @RequestMapping("/")
    public String home() {
        return "Coucou le monde";
    }
}
