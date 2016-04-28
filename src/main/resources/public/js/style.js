/**
 * Created by Edgar on 25/04/2016.
 */

var _toogleIsClick = false;
var _toogle = false;
var _pizzas = [];
function renderPanier() {
    var contentP = document.getElementsByClassName("popover-content");

    if (contentP[0] !== undefined) {
        contentP[0].innerHTML = '';
        if (_pizzas.length > 0){
            _pizzas.forEach(function (pizza, index) {
                if (contentP[0].innerHTML === undefined) {
                    contentP[0].innerHTML = '';
                } else {

                    contentP[0].innerHTML += '<div class="row" id="pizza-'+ index +'"> <div class="col-xs-6"> '+
                        pizza.name + '</div><div class="col-xs-1" id="number-'+ index +'">' + pizza.number + 'x'+
                        '</div><div class="col-xs-2"> <button type="button" id="btn-plus-'+index+'" class="btn btn-style-invers">'+
                        '<i class="fa fa-plus" aria-hidden="true"></i> </button></div>&nbsp;'+
                        '<div class="col-xs-2"> <button type="button" id="btn-moins-'+index+'" class="btn btn-default">'+
                        '<i class="fa fa-minus" aria-hidden="true"></i></button></div>'+
                        '</div><br>';

                    var idStr_plus = "#btn-plus-" + index;
                    var idStr_moins = "#btn-moins-" + index;
                    var idStrnum = "number-" + index;
                    var idPizzanum = "pizza-" + index;

                    $(idStr_moins).click(function () {
                        var index = _pizzas.findIndex(function (piz) {
                            return piz.name === pizza.name;
                        });
                        if (pizza.number > 0){
                            _pizzas[index].number -=1;
                            var div = document.getElementById(idStrnum);
                            div.innerHTML = _pizzas[index].number + 'x';
                        } else {
                            _pizzas.splice(index, 1);
                            var piz = document.getElementById(idPizzanum);
                            piz.innerHTML = '';
                        }
                    });
                    $(idStr_plus).click(function () {
                        var index = _pizzas.findIndex(function (piz) {
                            return piz.name === pizza.name;
                        });
                        _pizzas[index].number +=1;
                        var div = document.getElementById(idStrnum);
                        div.innerHTML = _pizzas[index].number + 'x';
                    });
                }
            });

        } else {
            contentP[0].innerHTML = "Panier vide";
        }
    }
}

function addPizza(pizzaName) {

    var index = _pizzas.findIndex(function (piz) {
        return piz.name === pizzaName;
    });
    if (index === -1) {
        _pizzas.push({name: pizzaName, number: 1});
    } else {
        _pizzas[index].number +=1;
    }

    if ($("#notification").hasClass("notification-hide")) {
        $("#notification").removeClass("notification-hide");
        $("#notification").addClass("notification-show");
    }
    var notif = document.getElementById("notification");
    notif.innerHTML = _pizzas.map( function (obj) { return obj.number; } ).reduce( function (a, b) { return a + b; } );

    $("#notification").addClass("anim");

    renderPanier();

}

function toogleIsClick() {
    if (_toogleIsClick) {
        checkCookie();
        console.log("toogle: " + _toogle);
        _toogleIsClick = false;
    }else {
        _toogleIsClick = true;    
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    _toogle = !_toogle;
     setCookie("toogleIsSelected", _toogle.toString(), 30);
}

$( document ).ready(function() {
    var checkbox = document.getElementById("cmn-toggle-5");
    if (getCookie("toogleIsSelected") === "true") {
        checkbox.checked = true;
        _toogle = true;
    } else {
        checkbox.checked = false;
        _toogle = false;
    }

    console.log("getCookie : " +   getCookie("toogleIsSelected"));
 });