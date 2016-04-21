package com.adg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@PropertySource(value = {"classpath:application.properties"})
public class App {

    public static void main( String[] args ) {
        SpringApplication.run(App.class, args);
    }
}
