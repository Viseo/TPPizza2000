var tmpIngredients = [];

// Component <Pizza/> Contain List Of Pizzas
var ElemPizza = React.createClass({
    getInitialState : function () {
        return {data: []};
    },
    render : function () {
        return <div className="col-md-6 text-center pizza">
                 <h3>{this.props.name}<div className="btn btn-style-2 btn-circle btn-lg" id={this.props.index} >{this.props.number}</div></h3>
                    <img className="imagepizza" src={this.props.url}/>
                    
                <div className="center-block" ><button onClick={this.onChange.bind(this, this.props)} className="btn btn-style">Cuisiner</button></div>
        </div>
    },
    onChange : function () {
        //this.setState({tmpIngredients : this.state.tmpIngredients.push(e.value)});
        var pizza = {"name":this.props.name,"ingredients":this.props.ingredients,"number":parseInt(this.props.number),"url": this.props.url};
        var data = {"ingredient" :tmpIngredients, "pizza" : pizza};
        var index = this.props.index;
        $.ajax({
            url: this.props.target,
            contentType:'application/json',
            type: 'POST',
            data:  JSON.stringify(data),
            dataType : 'json',
            success: function(data) {
                var alert = document.getElementById("alert");
                alert.innerHTML = '';
                $('#alert').removeClass("custom-alert");
                $('#alert').removeClass("hide-alert");
                $('#alert').removeClass("alert-success");
                $('#alert').removeClass("alert-danger");
                $('#alert').removeClass("show-alert");
                 if (data === true) {
                    var num = document.getElementById(index.toString());
                    num.innerHTML = (parseInt(num.innerHTML) + 1).toString();

                     $('#alert').addClass("alert-success");
                     $('#alert').addClass("show-alert");
                     alert.innerHTML = pizza.name + " a été cuisinée avec succées! ";
                     window.setTimeout(function () {
                         $('#alert').addClass("hide-alert");
                         $('#alert').removeClass("show-alert");
                     }, 3000);
                     window.setTimeout(function () {
                         $('#alert').removeClass("hide-alert");
                         $('#alert').removeClass("alert-success");
                         $('#alert').addClass("custom-alert");
                     }, 4500);
                } else {
                     $('#alert').addClass("alert-danger");
                     $('#alert').addClass("show-alert");
                     window.setTimeout(function () {
                         $('#alert').addClass("hide-alert");
                         $('#alert').removeClass("show-alert");
                     }, 3000);
                     window.setTimeout(function () {
                         $('#alert').removeClass("hide-alert");
                         $('#alert').removeClass("alert-danger");
                         $('#alert').addClass("custom-alert");
                     }, 4500);
                }

            }.bind(this),
            error: function(xhr, status, err) {
                //this.setState({data: data});
                //console.error(this.props.url, status, err.toString());
                console.log(data);
            }.bind(this)
        });
    }
});

var Pizza = React.createClass({
    getInitialState: function() {
        return {pizzas: [], count : 0};
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
            return <ElemPizza key={item.name} name={item.name} number={item.number} ingredients={item.ingredients} url={item.url} target="http://localhost:8080/admin/cooker" index={index}/>
        })}</div>;
    }
});

var ElemIngredient = React.createClass({
    getInitialState : function(){
        return {data: [], count:0};
    },
    onAdd : function (props) {
        // Add ingredient in memory stock
        this.setState({count:this.state.count+1});
        var ingredient = {};
        ingredient.name = props.name;
        ingredient.quantite = 1;
        tmpIngredients = tmpIngredients.concat(ingredient);
        console.log(tmpIngredients);
    },
    onMinus : function (props) {

        if(this.state.count>0)
            this.setState({count:this.state.count-1});
        // Add ingredient in memory stock
        var elem = tmpIngredients.find(function(elem){
            return elem.name == props.name;
        });
        var index = tmpIngredients.indexOf(elem);
        if(elem)tmpIngredients.splice(index, 1);
        console.log(tmpIngredients);
    },

    render : function () {
        return <div key={this.props.name}  className="row ingredient vcenter">
            <img src={this.props.url} className="img-ingredient col-md-3 vcenter"/>
            <div  className="col-md-5 description vcenter">{this.props.name}</div>
            <div className="btn btn-style-2 btn-circle btn-lg col-md-1 vcenter" >{this.state.count}</div>
            <button onClick={this.onAdd.bind(this, this.props)} className="btn btn-style col-md-1 btn-plus-moins vcenter" >+</button>
            <button onClick={this.onMinus.bind(this, this.props)}className="btn btn-style col-md-1 btn-plus-moins vcenter">-</button>
        </div>
    }
});
// Component <Ingredient/> Contain List Of Ingredients
var Ingredients = React.createClass({

    getInitialState: function() {
        return {ingredients: []};
    },

    componentDidMount: function() {
        // Get pizzas
        $.ajax({
            url : this.props.source,
            datatype : 'json' ,
            cache : false,
            success : function (data) {
                this.setState({ingredients : data});
            }.bind(this),
            error : function(xhr, status, err){
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
        // Get ingerdients
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


    render : function () {

        return<div>
        {this.state.ingredients.map(function (item, index) {
            return <ElemIngredient key={item.name} name={item.name} url={item.url} />
            })
        }
        </div>
    }

});

ReactDOM.render(
    <Pizza  source="http://localhost:8080/admin/pizza" />,
    document.getElementById('pizzas')
);

ReactDOM.render(
    <Ingredients   source="http://localhost:8080/admin/ingredient"/>,
    document.getElementById('ingredients')
);