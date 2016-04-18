package com.adg.model;

/**
 * Created by Edgar on 18/04/2016.
 */
public class Ingredient {

    private String _name;
    private String _url;

    public String get_url() {
        return _url;
    }

    public void set_url(String _url) {
        this._url = _url;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public Ingredient(String name, String url) {
        _name = name;
        _url = url;
    }
}
