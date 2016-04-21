package com.adg;

import com.adg.model.Pizza;
import com.adg.service.JsonReader;
import com.adg.service.JsonWriter;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

/**
 * Created by Edgar on 21/04/2016.
 */
public class JsonWriterTest {

    @Test
    public void testJsonReader() {
        try {
            JsonWriter jw = new JsonWriter();

            JsonReader reader = jw.get_reader();

            Pizza newpizza = reader.get_pizzas().get(0);
            newpizza.setNumber(5);

            jw.updatePizza(newpizza);

            JsonReader jr = new JsonReader();

            assertEquals(5, jr.get_pizzas().get(0).getNumber());

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }

    @Test
    public void testJsonReader2() {
        try {
            JsonWriter jw = new JsonWriter();

            JsonReader reader = jw.get_reader();

            Pizza newpizza = reader.get_pizzas().get(3);
            newpizza.setNumber(0);

            jw.updatePizza(newpizza);

            JsonReader jr = new JsonReader();

            assertEquals(0, jr.get_pizzas().get(3).getNumber());

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }

    @Test
    public void testJsonReader3() {
        try {
            JsonWriter jw = new JsonWriter();

            JsonReader reader = jw.get_reader();

            Pizza newpizza = reader.get_pizzas().get(2);
            newpizza.setNumber(1);

            jw.updatePizza(newpizza);

            JsonReader jr = new JsonReader();

            assertEquals(1, jr.get_pizzas().get(2).getNumber());

        } catch (IOException e) {
            assertEquals(1,2);
            e.printStackTrace();
        }
    }
}
