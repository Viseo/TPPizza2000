
// Sample static DATA pizza

// Sample static DATA ingredients


var Pizza = React.createClass({
    getInitialState: function() {
        return {pizzas: []};
    },
    componentDidMount: function() {
        this.serverRequest = $.get("http://localhost:8080/pizza", function (result) {
            var list = result;
            this.setState({pizzas : list});
            return pizzas;
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        // Generation of virtual DOM row pizza
        return <div>{this.state.pizzas.map(function (item, index) {
            return (<div className="col-md-4" key={index}>
                <h2>{item.name}</h2>
                <img src={item.url}/>
            </div>)
        })}</div>;

    }
});

var Ingredients = React.createClass({
    getInitialState : function(){
        return  {pizzas : pizzas};
    },

    handleInputCounter : function (e) {
        this.setState({counter: e.target + this.state.counter})
    },
    render : function () {

        return <ul >{this.props.items.map(function (item, index) {
            return <li key={index} class={item.name}>{item.name}</li>
        })}</ul>

    }

});


ReactDOM.render(

    <Pizza  items={pizzas} source="localhost:8080/pizza"/>,
    document.getElementById('pizzas')
);



ReactDOM.render(
    <Ingredients  items={ingredients} />,
    document.getElementById('ingredients')

);


