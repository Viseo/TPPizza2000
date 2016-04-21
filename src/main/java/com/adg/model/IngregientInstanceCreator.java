package com.adg.model;

import com.google.gson.InstanceCreator;

import java.lang.reflect.Type;

/**
 * Created by Edgar on 19/04/2016.
 */
public class IngregientInstanceCreator implements InstanceCreator<Ingredient> {

    @Override
    public Ingredient createInstance(Type type) {
        return new Ingredient();
    }
}
