

// Component <Pizza/> Contain List Of Pizzas
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
            return (<div className="col-md-4 text-center" key={index}>
                <h2>{item.name}</h2>
                <img src={item.url} className="imagepizza"/>
                <div className="center-block"><button  className="btn btn-style">+</button> <button  className="btn btn-style">-</button></div>

            </div>)
        })}</div>;

    }
});
// Component <Ingredient/> Contain List Of Ingredients
var Ingredients = React.createClass({

    getInitialState: function() {
        return {ingredients: [], pizzas : []};
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

        return<div> <form className="pizzaForm" onSubmit={this.handleSubmit}>
        {this.state.ingredients.map(function (item, index) {
            return <div key={item.name}  className="row">
                <img src={item.url} className="img-ingredient col-md-1"/>
                <div className="col-md-4 description">{item.name}</div>
                <input  className="col-md-1" className="btn btn-style"/>
                <button className="btn btn-style col-md-1 plus">+</button>
                <button className="btn btn-style col-md-1 minus">-</button>
            </div>
        })}
            <select className="col-md-3">{this.state.pizzas.map(function(item, index) {
            return <option>{item.name}</option>;
        })}</select></form></div>
    }

});


ReactDOM.render(

    <Pizza  items={pizzas} source="http://localhost:8080/admin/pizza"/>,
    document.getElementById('pizzas')
);

ReactDOM.render(
    <Ingredients   items={ingredients} source="http://localhost:8080/admin/ingredient"/>,
    document.getElementById('ingredients')

);


