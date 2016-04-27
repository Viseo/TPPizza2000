// ingredients list client-side
var tmpIngredients = [];
// Component <Pizza/> Contain List Of Pizzas
var ElemPizza = React.createClass({
    getInitialState : function () {
        return {data: []};
    },
    render : function () {
        return <div className="col-md-4 text-center">
                 <h3>{this.props.name}</h3><img className="imagepizza" src={this.props.url}/>
                <div className="center-block" ><button onClick={this.onChange.bind(this, this.props)} className="btn btn-style">+</button> <button  className="btn btn-style">-</button></div>
        </div>
    },
    onChange : function () {
        //this.setState({tmpIngredients : this.state.tmpIngredients.push(e.value)});
        var pizza = {"name":"FIGUE - CHÈVRE","ingredients":[{"name":"Mozzarella","url":"http://pizza.dominos.fr/media/1078/Mozzarella.png"},{"name":"Oignons","url":"http://pizza.dominos.fr/media/1064/OIGNON.png"},{"name":"Base Crème Fraîche","url":"http://pizza.dominos.fr/media/1074/sauces.png"},{"name":"Fourme d\u0027Ambert","url":"http://pizza.dominos.fr/media/1050/fromages.png"},{"name":"Chèvre","url":"http://pizza.dominos.fr/images/lf.png"},{"name":"Origan","url":"http://pizza.dominos.fr/media/1054/herbes.png"},{"name":"Bacon","url":"http://pizza.dominos.fr/media/1039/bacon.png"},{"name":"Miel","url":"http://pizza.dominos.fr/images/lf.png"},{"name":"Figues Séchées","url":"http://pizza.dominos.fr/images/lf.png"}],"number":5,"url":"http://image.dominos.fr/images/pizza/PSFCdetail.png"};
        var data = {"ingredient" :tmpIngredients, "pizza" : pizza};
        console.log(this.props.target);
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
            return <ElemPizza name={item.name} url={item.url} target="http://localhost:8080/admin/cooker"/>
        })}</div>;
    },
    onChange(){
        console.log("Hello ");
    }
});

var ElemIngredient = React.createClass({

    onChange : function (props) {
        //this.setState({tmpIngredients : this.state.tmpIngredients.push(e.value)});

        var ingredient = {};
        ingredient.name = props.name;
        ingredient.quantite += 1;
        var result = $.grep(tmpIngredients, function(e){ return e.name == props.name });
        // if ingredient does't exist in  tmpIngredient add it
        if(result.length == 0 ){tmpIngredients = tmpIngredients.concat(ingredient); }
        console.log(tmpIngredients);
    },
    render : function () {
        return <div key={this.props.name}  className="row">
            <img src={this.props.url} className="img-ingredient col-md-1"/>
            <div    className="col-md-4 description">{this.props.name}</div>
            <span className="quantite"></span>

            <button onClick={this.onChange.bind(this, this.props)} className="btn btn-style col-md-1 plus" >+</button>
            <button className="btn btn-style col-md-1 minus">-</button>
        </div>
    }
});
// Component <Ingredient/> Contain List Of Ingredients
var Ingredients = React.createClass({

    getInitialState: function() {
        return {ingredients: [], pizzas : [], tmpIngredients : []};
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
            return <ElemIngredient name={item.name} url={item.url} />
            })
        }
            <select className="col-md-5 list-pizzas">{this.state.pizzas.map(function(item) {
            return <option key={item.name}>{item.name}</option>;
        })}</select></div>
    }

});

ReactDOM.render(

    <Pizza  items={pizzas} source="http://localhost:8080/admin/pizza" />,
    document.getElementById('pizzas')
);

ReactDOM.render(
    <Ingredients   items={ingredients} source="http://localhost:8080/admin/ingredient"/>,
    document.getElementById('ingredients')

);