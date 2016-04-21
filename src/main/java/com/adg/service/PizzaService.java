package com.adg.service;

import com.adg.model.Ingredient;
import com.adg.model.IngregientInstanceCreator;
import com.adg.model.Pizza;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;

import javax.annotation.PostConstruct;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;


/**
 * Created by Edgar on 21/04/2016.
 */
@Service
public class PizzaService {

    @Value("${json.config.folder}")
    String jsonConfigFolder;

    @Autowired
    private ResourceLoader resourceLoader;

    private List<Pizza> _pizzas;

    public List<Pizza> getPizzas() {
        return _pizzas;
    }

    public void setPizzas(List<Pizza> pizzas) {
        this._pizzas = pizzas;
    }

    @PostConstruct
    private void init() throws IOException {
        final File pizzaData = resourceLoader.getResource("classpath:" + jsonConfigFolder).getFile();

        if (pizzaData.exists()) {
            FileInputStream fisTargetFile = new FileInputStream(pizzaData);

            String targetFileStr = IOUtils.toString(fisTargetFile, "UTF-8");

            GsonBuilder gsonBuilder = new GsonBuilder();
            gsonBuilder.registerTypeAdapter(Ingredient.class, new IngregientInstanceCreator());
            Gson gson = gsonBuilder.create();

            Type fooType = new TypeToken<List<Pizza>>() {
            }.getType();

            _pizzas = gson.fromJson(targetFileStr, fooType);
        }
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

    /**
     * pizza is update from his name and update the 'number'
     * @param pizzaToUpdate
     * @return true if it's worked
     */
    public boolean updatePizza(Pizza pizzaToUpdate) throws IOException {

        final File pizzaData = resourceLoader.getResource("classpath:" + jsonConfigFolder).getFile();

        for (Pizza pizza: _pizzas ) {
            if (pizzaToUpdate.getName().equals(pizza.getName()))
                pizza.setNumber(pizzaToUpdate.getNumber());
        }

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Ingredient.class, new IngregientInstanceCreator());
        Gson gson = gsonBuilder.create();

        String json = gson.toJson(_pizzas);

        Writer writer = null;
        try {
            writer = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(pizzaData), "utf-8"));
            writer.write(json);
        } catch (IOException ex) {
            return false;
        } finally {
            try {writer.close();} catch (Exception ex) {return false;}
        }

        return true;
    }

}
