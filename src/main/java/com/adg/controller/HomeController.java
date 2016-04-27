package com.adg.controller;

import com.adg.model.Cooker;
import com.adg.model.Ingredient;
import com.adg.model.Pizza;
import com.adg.service.JsonReader;
import com.adg.service.PizzaService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.comparator.BooleanComparator;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
@RestController
@RequestMapping("/admin")
public class HomeController {

    @Autowired
    private PizzaService pizzaService;

    @RequestMapping(value = "pizza", method = RequestMethod.GET)
    public List<Pizza> getpizza() {
        return pizzaService.getAllTypeOfPizza();
    }

    @RequestMapping(value = "ingredient", method = RequestMethod.GET)
    public List<Ingredient> getIngredients() {
        return pizzaService.getAllTypeOfIngredient();
    }


    @RequestMapping(value = "cooker", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)

    public Boolean coockPizza(@RequestBody ObjectNode requete) {


        System.out.println(requete.get("ingredient").getClass());


        return false;
    }


}
