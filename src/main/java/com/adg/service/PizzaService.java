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
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

@Service
public class PizzaService {

    @Value("${json.config.folder}")
    String jsonConfigFolder;

    @Autowired
    private ResourceLoader resourceLoader;

    private List<Pizza> pizzas;

    public List<Pizza> getPizzas() {
        return pizzas;
    }

    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
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

            pizzas = gson.fromJson(targetFileStr, fooType);
        }
    }
}