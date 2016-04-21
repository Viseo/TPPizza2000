package com.adg.model;

import com.adg.service.JsonReader;
import com.adg.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;

/**
 * Created by Edgar on 19/04/2016.
 *
 * Creat a pizza with ingredient
 */
public class Cooker {

    @Autowired
    private PizzaService pizzaService;

    private Pizza pizza;
    private List<Ingredient> ingredients;

    public Pizza getPizza() {
        return pizza;
    }

    public void setPizza(Pizza pizza) {
        this.pizza = pizza;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Cooker(Pizza pizzaToDo, List<Ingredient> ingredientForPizza) {
        pizza = pizzaToDo;
        ingredients = ingredientForPizza;
    }


    /**
     * if you can cook the pizza update the data.json +1 for the corresponding pizza
     * @return true if you have ingredient for cook the pizza false otherwise
     */
    public boolean cookPizza() {

        List<Ingredient> ingredientsneeded = pizzaService.getIngredientOf(pizza);
        for (Ingredient ingredient:ingredientsneeded ) {
            if (!ingredients.contains(ingredient))
                return false;
        }
        //We have all the ingredients
        pizza.setNumber(pizza.getNumber()+1);
        try {
            pizzaService.updatePizza(pizza);
        } catch (IOException e) {
            return false;
        }
        return true;
    }

    //TODO: buy pizza
}
