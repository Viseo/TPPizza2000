package com.adg;

import com.adg.model.Cooker;
import com.adg.model.Ingredient;
import com.adg.model.Pizza;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by Edgar on 19/04/2016.
 */
public class CookerTest {

    @Test
    public void testJsonReader() {
        Pizza pizza = new Pizza();
        pizza.setName("FIGUE - CHÈVRE");

        List<Ingredient> ingredients = new ArrayList<Ingredient>();
        // Populate the ingredients
        Ingredient ingredient6 = new Ingredient();
        ingredient6.setName("Mozzarella");
        ingredient6.setUrl("http://pizza.dominos.fr/media/1078/Mozzarella.png");
        ingredients.add(ingredient6);
        Ingredient ingredient5 = new Ingredient();
        ingredient5.setName("Oignons");
        ingredient5.setUrl("http://pizza.dominos.fr/media/1064/OIGNON.png");
        ingredients.add(ingredient5);
        Ingredient ingredient4 = new Ingredient();
        ingredient4.setName("Base Crème Fraîche");
        ingredient4.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
        ingredients.add(ingredient4);
        Ingredient ingredient3 = new Ingredient();
        ingredient3.setName("Fourme d'Ambert");
        ingredient3.setUrl("http://pizza.dominos.fr/media/1050/fromages.png");
        ingredients.add(ingredient3);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setName("Chèvre");
        ingredient2.setUrl("http://pizza.dominos.fr/images/lf.png");
        ingredients.add(ingredient2);

       // Cooker ck = new Cooker(pizza, ingredients);
        //assertEquals(false, ck.cookPizza());

        Ingredient ingredient50 = new Ingredient();
        ingredient50.setName("Origan");
        ingredient50.setUrl("http://pizza.dominos.fr/media/1054/herbes.png");
        ingredients.add(ingredient50);
        Ingredient ingredient40 = new Ingredient();
        ingredient40.setName("Bacon");
        ingredient40.setUrl("http://pizza.dominos.fr/media/1039/bacon.png");
        ingredients.add(ingredient40);
        Ingredient ingredient30 = new Ingredient();
        ingredient30.setName("Miel");
        ingredient30.setUrl("http://pizza.dominos.fr/images/lf.png");
        ingredients.add(ingredient30);
        Ingredient ingredient20 = new Ingredient();
        ingredient20.setName("Figues Séchées");
        ingredient20.setUrl("http://pizza.dominos.fr/images/lf.png");
        ingredients.add(ingredient20);

        //ck.setIngredients(ingredients);
        //assertEquals(true, ck.cookPizza());
    }
}
