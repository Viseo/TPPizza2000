// ingredients list client-side
var tmpIngredients = [];

// Component <Pizza/> Contain List Of Pizzas
var ElemPizza = React.createClass({
    getInitialState : function () {
        return {data: []};
    },
    render : function () {
        return <div className="col-md-4 text-center">
                 <h3>{this.props.name}<button className="btn btn-style-2 btn-circle btn-lg">{this.props.number}</button></h3><img className="imagepizza" src={this.props.url}/>
                <div className="center-block" ><button onClick={this.onChange.bind(this, this.props)} className="btn btn-style">+</button><button  className="btn btn-style">-</button></div>
        </div>
    },
    onChange : function () {
        //this.setState({tmpIngredients : this.state.tmpIngredients.push(e.value)});
        var pizza = {"name":this.props.name,"ingredients":this.props.ingredients,"number":parseInt(this.props.number),"url": this.props.url};
        var data = {"ingredient" :tmpIngredients, "pizza" : pizza};
        console.log(this.props);
        $.ajax({
            url: this.props.target,
            contentType:'application/json',
            type: 'POST',
            data:  JSON.stringify(data),
            dataType : 'json',
            success: function(data) {
                //this.setState({data: data});
                console.log(data);

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

            return <ElemPizza key={item.name} name={item.name} number={item.number} ingredients={item.ingredients} url={item.url} target="http://localhost:8080/admin/cooker"/>
        })}</div>;
    },
    onChange(){
        console.log("Hello ");
    }
});

var ElemIngredient = React.createClass({

    onAdd : function (props) {
        // Add ingredient in memory stock
        var ingredient = {};
        ingredient.name = props.name;
        ingredient.quantite = 1;
        tmpIngredients = tmpIngredients.concat(ingredient);
        console.log(tmpIngredients);
    },
    onMinus : function (props) {
        // Add ingredient in memory stock
        var elem = tmpIngredients.find(function(elem){
            return elem.name == props.name;
        });
        var index = tmpIngredients.indexOf(elem);
        tmpIngredients.splice(index, 1);
        console.log(tmpIngredients);
    },

    render : function () {


        return <div key={this.props.name}  className="row">
            <img src={this.props.url} className="img-ingredient col-md-1"/>
            <div    className="col-md-4 description">{this.props.name}</div>
            <span className="quantite">{ }</span>
            <button onClick={this.onAdd.bind(this, this.props)} className="btn btn-style col-md-1 plus" >+</button>
            <button onClick={this.onMinus.bind(this, this.props)}className="btn btn-style col-md-1 minus">-</button>
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
    <Pizza items={pizzas} source="http://localhost:8080/admin/pizza" />,
    document.getElementById('pizzas')
);

ReactDOM.render(
    <Ingredients   items={ingredients} source="http://localhost:8080/admin/ingredient"/>,
    document.getElementById('ingredients')

);

