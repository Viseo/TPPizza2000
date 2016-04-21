package com.adg;

import com.adg.controller.HomeController;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import static org.junit.Assert.assertEquals;

/**
 * Unit test for simple App.
 */
public class AppTest {

    @org.junit.Test
    public void testApp() {
        HomeController hc = new HomeController();
        //String result = hc.home();
        //assertEquals(result, "Coucou le monde");
    }


}
