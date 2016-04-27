/**
 * Created by Edgar on 25/04/2016.
 */
var _pizzas = [];

$("#pannier-container").popover({
        trigger : 'click',
        placement : 'bottom',
        html: 'true',
        title:'<h5 align="center">Pannier</h5>',
        content : '',
        template:
        '<div class="popover"><div class="arrow"></div>'+
        '<h2 class="popover-title"></h2><div class="popover-content">'+

        '</div><div class="popover-footer text-center"><button type="button" class="btn btn-style-invers popover-submit">'+
        '<i class="fa fa-check" aria-hidden="true"></i> Valider </button>&nbsp;&nbsp;'+

        '<button type="button" id="popover-cancel" class="btn btn-default popover-cancel">'+
        '<i class="fa fa-times" aria-hidden="true"></i> Annuler </button></div></div>'
    })
    .on('show.bs.popover', function() {

        //hide any visible comment-popover
        var $this = $(this);
        window.setTimeout(function () {

            $("#notification").removeClass("notification-show");
            $("#notification").addClass("notification-hide");
            var notif = document.getElementById("notification");
            notif.innerHTML = "0";

            renderPanier();
            //close on cancel
            $('.popover-cancel').click(function() {
                _pizzas = [];
                notif.innerHTML = '0';
                $this.popover('hide');
            });
            //update link text on submit
            $('.popover-submit').click(function() {

                $this.text($('.popover-textarea').val());
                $this.popover('hide');
            });
        }, 50);

    });


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
            contentP[0].innerHTML = "Vous n'avez pas choisi de pizza";
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


