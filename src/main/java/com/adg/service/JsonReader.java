package com.adg.service;

import com.adg.model.Ingredient;
import com.adg.model.IngregientInstanceCreator;
import com.adg.model.Pizza;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

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

    //@Value("${json.config.folder}")
    String _jsonFolder="/Users/Edgar/VISEO/miniProjet/TPPizza2000/src/main/java/com/adg/repository/data.json";

    /**
     * Init data type _pizzas from the json file
     * @throws IOException
     */
    public JsonReader() throws IOException {
        _pizzas = new ArrayList<Pizza>();
        FileInputStream fisTargetFile = new FileInputStream(new File(_jsonFolder));

        String targetFileStr = IOUtils.toString(fisTargetFile, "UTF-8");

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Ingredient.class, new IngregientInstanceCreator());
        Gson gson = gsonBuilder.create();

        Type fooType = new TypeToken<List<Pizza>>() {}.getType();
        _pizzas = gson.fromJson(targetFileStr, fooType);

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
