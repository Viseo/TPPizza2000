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

        var contentP = document.getElementsByClassName("popover-content");

        window.setTimeout(function () {

            $("#notification").removeClass("notification-show");
            $("#notification").addClass("notification-hide");
            var notif = document.getElementById("notification");
            notif.innerHTML = "0";


            var pizzas = [];

            _pizzas.forEach(function(pizzaName) {
                if (pizzas.length === 0 ){
                    pizzas.push({name: pizzaName, number:0});
                }
                 pizzas.forEach(function (pizza) {
                     if (pizzaName === pizza.name) {
                        pizza.number += 1;
                    } else  {
                        pizzas.push({name: pizzaName, number:1});
                    }
                });
            });

            if (_pizzas.length > 0){
                pizzas.forEach(function (pizza) {
                    if (contentP[0].innerHTML === undefined) {
                        contentP[0].innerHTML = '';
                    } else {
                        contentP[0].innerHTML += '<div class="row"> <div class="col-xs-6"> '+
                            pizza.name + '</div><div class="col-xs-1">' + pizza.number + 'x'+
                            '</div><div class="col-xs-2"> <button type="button"  class="btn btn-style-invers ">'+
                            '<i class="fa fa-plus" aria-hidden="true"></i> </button></div>&nbsp;'+
                            '<div class="col-xs-2"> <button type="button" class="btn btn-default">'+
                            '<i class="fa fa-minus" aria-hidden="true"></i></button></div>'+
                            '</div><br>';
                    }
                });
            }




            //close on cancel
            $('.popover-cancel').click(function() {
                _pizzas = [];
                $this.popover('hide');
            });
            //update link text on submit
            $('.popover-submit').click(function() {

                $this.text($('.popover-textarea').val());
                $this.popover('hide');
            });

        }, 50);




    });



function addPizza(pizzaName) {
    _pizzas.push(pizzaName);

    if ($("#notification").hasClass("notification-hide")) {
        $("#notification").removeClass("notification-hide");
        $("#notification").addClass("notification-show");
    }

    var notif = document.getElementById("notification");
    notif.innerHTML = _pizzas.length.toString();

    $("#notification").addClass("anim");
}


