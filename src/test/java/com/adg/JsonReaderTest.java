package com.adg;

import com.adg.model.Ingredient;
import com.adg.model.Pizza;
import com.adg.service.JsonReader;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by Edgar on 19/04/2016.
 */
public class JsonReaderTest {

    @Test
    public void testJsonReader() {
        try {
            JsonReader jr = new JsonReader();

            assertEquals("BOEUF - PÉPPERONI", jr.get_pizzas().get(1).getName());

            assertEquals("LA FORESTIÈRE", jr.get_pizzas().get(4).getName());
            assertEquals("http://image.dominos.fr/images/pizza/PFORdetail.png", jr.get_pizzas().get(4).getUrl());
            assertEquals(3, jr.get_pizzas().get(4).getNumber());
            assertEquals("Mozzarella", jr.get_pizzas().get(4).getIngredients().get(0).getName());
            assertEquals("Champignons", jr.get_pizzas().get(4).getIngredients().get(3).getName());

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }


    @Test
    public void testGetIngredientOf() {
        try {
            JsonReader jr = new JsonReader();
            Pizza pizza = new Pizza();
            pizza.setName("BACON GROOVYI");
            List<Ingredient> ingredients = jr.getIngredientOf(pizza);

            List<Ingredient> ingredientsBACON_GROOVY = new ArrayList<Ingredient>();
            // Populate the ingredientsBACON_GROOVY
            Ingredient ingredient6 = new Ingredient();
            ingredient6.setName("Mozzarella");
            ingredient6.setUrl("http://pizza.dominos.fr/media/1078/Mozzarella.png");
            ingredientsBACON_GROOVY.add(ingredient6);
            Ingredient ingredient5 = new Ingredient();
            ingredient5.setName("Oignons");
            ingredient5.setUrl("http://pizza.dominos.fr/media/1064/OIGNON.png");
            ingredientsBACON_GROOVY.add(ingredient5);
            Ingredient ingredient4 = new Ingredient();
            ingredient4.setName("Base Crème Fraîche");
            ingredient4.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
            ingredientsBACON_GROOVY.add(ingredient4);
            Ingredient ingredient3 = new Ingredient();
            ingredient3.setName("Sauce barbecue");
            ingredient3.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
            ingredientsBACON_GROOVY.add(ingredient3);
            Ingredient ingredient2 = new Ingredient();
            ingredient2.setName("Poulet rôti");
            ingredient2.setUrl("http://pizza.dominos.fr/media/1072/poulet.png");
            ingredientsBACON_GROOVY.add(ingredient2);
            Ingredient ingredient1 = new Ingredient();
            ingredient1.setName("Bacon");
            ingredient1.setUrl("http://pizza.dominos.fr/media/1039/bacon.png");
            ingredientsBACON_GROOVY.add(ingredient1);

            assertEquals(ingredientsBACON_GROOVY.size(), ingredients.size());
            for (int i = 0; i < ingredients.size(); ++i) {
                assertEquals(ingredientsBACON_GROOVY.get(i).getName(), ingredients.get(i).getName());
                assertEquals(ingredientsBACON_GROOVY.get(i).getUrl(), ingredients.get(i).getUrl());
            }


        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }

    @Test
    public void testGetAllTypeOfIngredient() {
        try {
            JsonReader jr = new JsonReader();
            List<Ingredient> ingredients = jr.getAllTypeOfIngredient();

            List<Ingredient> ingredientsSupose = new ArrayList<Ingredient>();
            // Populate the ingredientsSupose
            Ingredient ingredient6 = new Ingredient();
            ingredient6.setName("Mozzarella");
            ingredient6.setUrl("http://pizza.dominos.fr/media/1078/Mozzarella.png");
            ingredientsSupose.add(ingredient6);
            Ingredient ingredient5 = new Ingredient();
            ingredient5.setName("Oignons");
            ingredient5.setUrl("http://pizza.dominos.fr/media/1064/OIGNON.png");
            ingredientsSupose.add(ingredient5);
            Ingredient ingredient4 = new Ingredient();
            ingredient4.setName("Base Crème Fraîche");
            ingredient4.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
            ingredientsSupose.add(ingredient4);
            Ingredient ingredient3 = new Ingredient();
            ingredient3.setName("Fourme d'Ambert");
            ingredient3.setUrl("http://pizza.dominos.fr/media/1050/fromages.png");
            ingredientsSupose.add(ingredient3);
            Ingredient ingredient2 = new Ingredient();
            ingredient2.setName("Chèvre");
            ingredient2.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient2);
            Ingredient ingredient1 = new Ingredient();
            ingredient1.setName("Origan");
            ingredient1.setUrl("http://pizza.dominos.fr/media/1054/herbes.png");
            ingredientsSupose.add(ingredient1);
            Ingredient ingredient7 = new Ingredient();
            ingredient7.setName("Bacon");
            ingredient7.setUrl("http://pizza.dominos.fr/media/1039/bacon.png");
            ingredientsSupose.add(ingredient7);
            Ingredient ingredient8 = new Ingredient();
            ingredient8.setName("Miel");
            ingredient8.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient8);
            Ingredient ingredient9 = new Ingredient();
            ingredient9.setName("Figues Séchées");
            ingredient9.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient9);
            Ingredient ingredient10 = new Ingredient();
            ingredient10.setName("Pepperoni");
            ingredient10.setUrl("http://pizza.dominos.fr/media/1066/pepperoni.png");
            ingredientsSupose.add(ingredient10);
            Ingredient ingredient11 = new Ingredient();
            ingredient11.setName("Tomates fraîches");
            ingredient11.setUrl("http://pizza.dominos.fr/media/1077/tomates-fraiches.png");
            ingredientsSupose.add(ingredient11);
            Ingredient ingredient12 = new Ingredient();
            ingredient12.setName("Base Sauce barbecue");
            ingredient12.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
            ingredientsSupose.add(ingredient12);
            Ingredient ingredient13 = new Ingredient();
            ingredient13.setName("Sauce épicée au piment chipotle et coriandre");
            ingredient13.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient13);
            Ingredient ingredient14 = new Ingredient();
            ingredient14.setName("Bœuf effiloché");
            ingredient14.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient14);
            Ingredient ingredient15 = new Ingredient();
            ingredient15.setName("Saumon d'Écosse fumé au bois de hêtre");
            ingredient15.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient15);
            Ingredient ingredient16 = new Ingredient();
            ingredient16.setName("Aneth");
            ingredient16.setUrl("http://pizza.dominos.fr/media/1054/herbes.png");
            ingredientsSupose.add(ingredient16);
            Ingredient ingredient17 = new Ingredient();
            ingredient17.setName("Pommes de terre poêlées");
            ingredient17.setUrl("http://pizza.dominos.fr/media/1071/pommes-de-terre.png");
            ingredientsSupose.add(ingredient17);
            Ingredient ingredient18 = new Ingredient();
            ingredient18.setName("Sauce aneth");
            ingredient18.setUrl("http://pizza.dominos.fr/media/1054/herbes.png");
            ingredientsSupose.add(ingredient18);
            Ingredient ingredient19 = new Ingredient();
            ingredient19.setName("Sauce saveur truffe");
            ingredient19.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient19);
            Ingredient ingredient20 = new Ingredient();
            ingredient20.setName("Champignons");
            ingredient20.setUrl("http://pizza.dominos.fr/media/1044/champignons.png");
            ingredientsSupose.add(ingredient20);
            Ingredient ingredient21 = new Ingredient();
            ingredient21.setName("Jambon");
            ingredient21.setUrl("http://pizza.dominos.fr/media/1055/jambon.png");
            ingredientsSupose.add(ingredient21);
            Ingredient ingredient22 = new Ingredient();
            ingredient22.setName("Lardons");
            ingredient22.setUrl("http://pizza.dominos.fr/images/lf.png");
            ingredientsSupose.add(ingredient22);
            Ingredient ingredient23 = new Ingredient();
            ingredient23.setName("Bœuf Epicé");
            ingredient23.setUrl("http://image.dominos.fr/images/pizza/PCANdetail.png");
            ingredientsSupose.add(ingredient23);
            Ingredient ingredient24 = new Ingredient();
            ingredient24.setName("Merguez");
            ingredient24.setUrl("http://pizza.dominos.fr/media/1059/merguez.png");
            ingredientsSupose.add(ingredient24);
            Ingredient ingredient25 = new Ingredient();
            ingredient25.setName("Poulet rôti");
            ingredient25.setUrl("http://pizza.dominos.fr/media/1072/poulet.png");
            ingredientsSupose.add(ingredient25);
            Ingredient ingredient26 = new Ingredient();
            ingredient26.setName("Base sauce Tomate");
            ingredient26.setUrl("http://pizza.dominos.fr/media/1075/sauce-tomate.png");
            ingredientsSupose.add(ingredient26);
            Ingredient ingredient27 = new Ingredient();
            ingredient27.setName("Emmental");
            ingredient27.setUrl("http://pizza.dominos.fr/media/1050/fromages.png");
            ingredientsSupose.add(ingredient27);

            //Assert size
//            assertEquals(ingredientsSupose.size(), ingredients.size());
            //Assert content
//            for (int i = 0; i < ingredients.size(); ++i) {
//                if (!ingredients.contains(ingredientsSupose.get(i)))
//                    assertEquals(ingredientsSupose.get(i).getName(), ingredients.get(i).getName());
//            }

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }

    @Test
    public void testGetAllTypeOfPizza() {
        try {
            JsonReader jr = new JsonReader();
            List<Pizza> pizzas = jr.getAllTypeOfPizza();

            List<Pizza> pizzaSuppose = new ArrayList<Pizza>();
            // Populate the ingredientsSupose
            Pizza pizza6 = new Pizza();
            pizza6.setName("FIGUE - CHÈVRE");
            pizza6.setUrl("http://image.dominos.fr/images/pizza/PSFCdetail.png");
            pizzaSuppose.add(pizza6);
            Pizza pizza5 = new Pizza();
            pizza5.setName("BOEUF - PÉPPERONI");
            pizza5.setUrl("http://image.dominos.fr/images/pizza/PSSEdetail.png");
            pizzaSuppose.add(pizza5);
            Pizza pizza4 = new Pizza();
            pizza4.setName("SAUMON D'ECOSSE");
            pizza4.setUrl("http://pizza.dominos.fr/media/1074/sauces.png");
            pizzaSuppose.add(pizza4);
            Pizza pizza3 = new Pizza();
            pizza3.setName("BACON SAUCE SAVEUR TRUFFE");
            pizza3.setUrl("http://image.dominos.fr/images/pizza/PSBTdetail.png");
            pizzaSuppose.add(pizza3);
            Pizza pizza2 = new Pizza();
            pizza2.setName("LA FORESTIÈRE");
            pizza2.setUrl("http://image.dominos.fr/images/pizza/PFORdetail.png");
            pizzaSuppose.add(pizza2);
            Pizza pizza1 = new Pizza();
            pizza1.setName("LA CANNIBALE");
            pizza1.setUrl("http://image.dominos.fr/images/pizza/PCANdetail.png");
            pizzaSuppose.add(pizza1);
            Pizza pizza7 = new Pizza();
            pizza7.setName("CHICKENITA PEPPERONI");
            pizza7.setUrl("http://image.dominos.fr/images/pizza/PCHIdetail.png");
            pizzaSuppose.add(pizza7);
            Pizza pizza8 = new Pizza();
            pizza8.setName("BACON GROOVYI");
            pizza8.setUrl("http://image.dominos.fr/images/pizza/PBCGdetail.png");
            pizzaSuppose.add(pizza8);

            //Assert size
            assertEquals(pizzaSuppose.size(), pizzas.size());
            //Assert content
            for (int i = 0; i < pizzas.size(); ++i) {
                if (!pizzas.contains(pizzaSuppose.get(i)))
                    assertEquals(pizzaSuppose.get(i).getName(), pizzas.get(i).getName());
            }

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }
}
