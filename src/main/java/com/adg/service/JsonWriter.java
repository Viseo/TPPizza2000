package com.adg.service;

import com.adg.model.Ingredient;
import com.adg.model.IngregientInstanceCreator;
import com.adg.model.Pizza;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.*;
import java.lang.reflect.Type;
import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
public class JsonWriter {

    public JsonReader get_reader() {
        return _reader;
    }

    public void set_reader(JsonReader _reader) {
        this._reader = _reader;
    }

    private JsonReader _reader;

    @Autowired
    private PizzaService pizzaService;

    /**
     * Creat a json writer
     * @throws IOException
     */
    public JsonWriter() throws IOException {
        _reader = new JsonReader();
    }

    /**
     * pizza is update from his name and update the 'number'
     * @param pizzaToUpdate
     * @return true if it's worked
     */
    public boolean updatePizza(Pizza pizzaToUpdate) {

        List<Pizza> pizzas = _reader.get_pizzas();

        for (Pizza pizza: pizzas ) {
            if (pizzaToUpdate.getName().equals(pizza.getName()))
                pizza.setNumber(pizzaToUpdate.getNumber());
        }

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Ingredient.class, new IngregientInstanceCreator());
        Gson gson = gsonBuilder.create();

        String json = gson.toJson(pizzas);

        Writer writer = null;
        try {
            writer = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(pizzaService.jsonConfigFolder), "utf-8"));
            writer.write(json);
        } catch (IOException ex) {
            return false;
        } finally {
            try {writer.close();} catch (Exception ex) {return false;}
        }

        return true;
    }
}
