package com.adg.model;



/**
 * Created by Edgar on 18/04/2016.
 */
public class Ingredient {

    private String name;
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Can not have parameteur for serialization
    public Ingredient() { }

    @Override
    public boolean equals(Object obj) {
        Ingredient ingredient = (Ingredient) obj;
        if(ingredient.name.equals(name) && ingredient.url.equals(url))
            return true;
        return false;
    }
}
