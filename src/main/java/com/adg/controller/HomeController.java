package com.adg.controller;

import com.adg.model.Cooker;
import com.adg.model.Ingredient;
import com.adg.model.Pizza;
import com.adg.service.JsonReader;
import com.adg.service.PizzaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
@RestController
@RequestMapping("/pizza")
public class HomeController {

    @Autowired
    private PizzaService pizzaService;

    @RequestMapping(value = "pizza", method = RequestMethod.GET)
    public List<Pizza> getpizza() {
        return pizzaService.getAllTypeOfPizza();
    }

    @RequestMapping(value = "pizza", method = RequestMethod.POST)
    public boolean coockPizza(@RequestBody Pizza newpizza, @RequestBody List<Ingredient> listIngredient) {
        Cooker cooker = new Cooker(newpizza, listIngredient);
        return cooker.cookPizza();
    }

}
