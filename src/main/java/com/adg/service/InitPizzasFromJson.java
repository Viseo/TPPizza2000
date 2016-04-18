package com.adg.service;

import com.adg.model.Pizza;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * Created by Edgar on 18/04/2016.
 */
@Service
public class InitPizzasFromJson {

    List<Pizza> _pizzas;

    @Value("${json.config.folder}")
    String jsonFolder;

    public InitPizzasFromJson () {
        ObjectMapper jsonMapper = new ObjectMapper();
        File jsonFile = new File(jsonFolder);
        // deserialize contents of each file into an object of type
        //_pizzas = jsonMapper.read
        ContextOperatorBean operator = jsonMapper.readValue(jsonFile, new TypeReference<List<ContextOperatorBean>>() {});
        operators.add(operator);

    }

}
