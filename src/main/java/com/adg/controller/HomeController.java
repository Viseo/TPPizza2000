package com.adg.controller;

import com.adg.model.Pizza;
import com.adg.service.JsonReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
@RestController
public class HomeController {

    @Autowired
    JsonReader jsonReader;

    @RequestMapping("/pizza")
    public List<Pizza> home() {
//        JsonReader jr = null;
//        try {
//            jr = new JsonReader();
//        } catch (IOException e) {A
//            e.printStackTrace();
//        }

        List<Pizza> pizzas = jsonReader.getAllTypeOfPizza();

        return pizzas;
    }
}
