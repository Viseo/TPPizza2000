package com.adg.model;

import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
public class Pizza {

    private String _name;
    private List<Ingredient> _ingredients;

    public List<Ingredient> get_ingredients() {
        return _ingredients;
    }

    public void set_ingredients(List<Ingredient> _ingredients) {
        this._ingredients = _ingredients;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public Pizza(String name, List<Ingredient> list) {
        _name = name;
        _ingredients = list;
    }
}
