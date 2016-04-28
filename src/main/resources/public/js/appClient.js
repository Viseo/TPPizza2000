/**
 * Created by ABE3510 on 28/04/2016.
 */

var ElemPizza = React.createClass({
    getInitialState : function () {
        return {data: []};
    },
    render : function () {
        return <div className="col-md-4 text-center pizza">
            <h3>{this.props.name}<button className="btn btn-style-2 btn-circle btn-lg">{this.props.number}</button></h3><img className="imagepizza" src={this.props.url}/>
            <div className="center-block" ><button onClick={this.onReserver.bind(this, this.props)} className="btn btn-style">Réserver</button></div>
        </div>
    },
    onReserver : function () {
        addPizza(this.props.name);
    }
});
var Pizza = React.createClass({
    getInitialState: function() {
        return {pizzas: []};
    },
    componentDidMount: function() {
        $.ajax({
            url : this.props.source,
            datatype : 'json' ,
            cache : false,
            success : function (data) {
                this.setState({pizzas : data});
            }.bind(this),
            error : function(xhr, status, err){
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        // Generation of virtual DOM row pizza
        return <div>{this.state.pizzas.map(function (item, index) {
            return <ElemPizza key={item.name} name={item.name} number={item.number} ingredients={item.ingredients} url={item.url} target="http://localhost:8080/admin/cooker"/>
        })}</div>;
    }

});
var Panier = React.createClass({
    getInitialState : function () {
      return {title : "Hello Pizza"};
    },
    render: function() {
        return<div className="row-fluid">
            <div className="col-md-4 col-md-offset-4">
                <h1>{this.state.title}</h1>
            </div>
            <div className="col-md-2 col-md-offset-2">
                <div id="notification" className="notification-hide">0</div>
                <i id="pannier-container" onClick={this.onClick} className="fa fa-shopping-basket fa-4x pannier" aria-hidden="true" data-original-title title aria-describedby="popover564388" ></i>
            </div>
        </div>;
    },
    onClick : function () {
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
                    var data = _pizzas;
                    //update link text on submit
                    $('.popover-submit').click(function() {
                       
                        $this.text($('.popover-textarea').val());
                        $this.popover('hide');
                    });
                }, 50);

            });
        console.log(_pizzas);
    }
});
ReactDOM.render(
    <Panier  target="http://localhost:8080/admin/buypizza" />,
    document.getElementById('header')
);
ReactDOM.render(
    <Pizza source="http://localhost:8080/admin/pizza" />,
    document.getElementById('pizzas')
);


