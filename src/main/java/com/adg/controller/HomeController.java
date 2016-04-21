package com.adg.controller;

import com.adg.model.Pizza;
import com.adg.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
@RestController
public class HomeController {

    @Autowired
    private PizzaService pizzaService;

    @RequestMapping("/pizza")
    public List<Pizza> home() {

        return pizzaService.getPizzas();
    }
}
