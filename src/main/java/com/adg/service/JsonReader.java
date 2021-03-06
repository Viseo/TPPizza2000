package com.adg.service;

import com.adg.model.Ingredient;
import com.adg.model.IngregientInstanceCreator;
import com.adg.model.Pizza;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import org.springframework.core.io.ResourceLoader;

/**
 * Created by Edgar on 18/04/2016.
 */
@Service
public class JsonReader {

    List<Pizza> _pizzas;

    public List<Pizza> get_pizzas() {
        return _pizzas;
    }

    public void set_pizzas(List<Pizza> _pizzas) {
        this._pizzas = _pizzas;
    }

    @Autowired
    private PizzaService pizzaService;

    /**
     * Init data type _pizzas from the json file
     * @throws IOException
     */
    public JsonReader() throws IOException {
//        _pizzas = new ArrayList<Pizza>();
//        _pizzas = pizzaService.getPizzas();
    }

    /**
     * get all the ingredient of a pizza.
     * pizza only need a relevant name.
     * return null if no pizza matching
     * @param pizza
     * @return
     */
    public List<Ingredient> getIngredientOf(Pizza pizza) {

        for (Pizza piz : _pizzas) {
            if (piz.getName().equals(pizza.getName())) {
                return piz.getIngredients();
            }
        }

        return null;
    }

    /**
     * Return all the ingredient in the data.json
     * without copy
     * @return
     */
    public List<Ingredient> getAllTypeOfIngredient() {

        List<Ingredient> ingredients = new ArrayList<Ingredient>();
        for (Pizza piz : _pizzas) {
            List<Ingredient> ings = piz.getIngredients();
            //parcourire tous les ingedients de chaques pizza
            for ( Ingredient i : ings) {
                if(!ingredients.contains(i))
                    ingredients.add(i);
            }
        }
        return ingredients;
    }

    /**
     * Return all Pizza in the data.json
     * @return
     */
    public List<Pizza> getAllTypeOfPizza() {

        List<Pizza> pizzas = new ArrayList<Pizza>();
        for (Pizza piz : _pizzas) {
            if (!pizzas.contains(piz))
                pizzas.add(piz);
        }
        return  pizzas;
    }

}
