package com.adg.model;

import com.adg.service.JsonReader;
import com.adg.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Edgar on 19/04/2016.
 *
 * Creat a pizza with ingredient
 */
public class Cooker {

    private PizzaService pizzaService;

    private Pizza pizza;
    private List<Pizza> pizzas;
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

    /**
     * Cooker for making a pizza
     * @param pizzaToDo
     * @param ingredientForPizza
     */
    public Cooker(Pizza pizzaToDo, List<Ingredient> ingredientForPizza, PizzaService pizzaServ) {
        pizzaService = pizzaServ;
        pizza = pizzaToDo;
        ingredients = ingredientForPizza;
    }

    /**
     * Cooker for buying a pizza
     * @param pizzasToDo
     */
    public Cooker(List<Pizza>  pizzasToDo, PizzaService pizzaSer) {
        this.pizzas = pizzasToDo;
        this.pizzaService = pizzaSer;
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

    /* If you don't put all ingredients for creating the pizza,
    *
    * */

    public List<Ingredient> indispoIng (List<Ingredient> IngN){
        List<Ingredient> ingredientN = pizzaService.getIngredientOf(pizza);
        for (Ingredient ingredient:ingredientN ) {
            if (ingredientN != IngN){

            }
        }
        return indispoIng(ingredientN);
    }


    /**
     * if you can by a pizza update the data.json - 1 for the corresponding pizza
     * @return true if pizza existe en pizza number > 0  false otherwise
     */
    public boolean buyPizza() {
        List<Pizza> newPizzas = new ArrayList<Pizza>();
        // Verify quantity purshases of pizza
        for (Pizza piz : pizzas){
            for (Pizza t : pizzaService.getAllTypeOfPizza()){
                if(piz.getName().equals(t.getName()) && piz.getNumber() > t.getNumber()){
                    return false;
                }

            }
            newPizzas.add(piz);
        }
        // Update pizza quantity
        for (Pizza piz : newPizzas){
            for (Pizza t : pizzaService.getAllTypeOfPizza()){
                if(piz.getName().equals(t.getName())){
                    Pizza newPizza = new Pizza();
                    newPizza.setName(piz.getName());
                    newPizza.setNumber(t.getNumber()-piz.getNumber());
                    // Check number
                    if(t.getNumber()-piz.getNumber()>=0){
                        try {
                            pizzaService.updatePizza(newPizza);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }


        return true;
    }
}
