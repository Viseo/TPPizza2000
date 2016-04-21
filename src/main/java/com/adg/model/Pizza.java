package com.adg.model;

import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
public class Pizza {

    private String name;
    private List<Ingredient> ingredients;
    //Quantitée
    private int number;
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Can not have parameteur for serialization
    public Pizza() {}

    @Override
    public boolean equals(Object obj) {
        Pizza pizza = (Pizza) obj;
        if(pizza.name.equals(name) && pizza.url.equals(url))
            return true;
        return false;

    }
}
