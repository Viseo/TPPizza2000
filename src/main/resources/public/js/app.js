
// Sample static DATA pizza

// Sample static DATA ingredients


var Pizza = React.createClass({
    getInitialState: function() {
        return {pizzas: []};
    },
    componentDidMount: function() {
        this.serverRequest = $.get("http://localhost:8080/admin/pizza", function (result) {
            this.setState({pizzas : result});
            return pizzas;
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        // Generation of virtual DOM row pizza
        return <div>{this.state.pizzas.map(function (item, index) {
            return (
                <div className="col-md-4" key={index}>
                <h3>{item.name}</h3>
                <img src={item.url} className="imagepizza"/>

            </div>)
        })}</div>;

    }
});
// <button className="btn btn-style">+</button>
// <button className="btn btn-style">-</button>

var Ingredients = React.createClass({
    getInitialState : function(){
        return  {ingredient : []};
    },
    componentDidMount: function() {
        this.serverRequest = $.get("http://localhost:8080/admin/ingredient", function (result) {
            this.setState({ingredient : result});
            return ingredient;
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render : function () {
        return <ul >{this.state.ingredient.map(function (item, index) {
            return (
                <li key={index} class={item.name}>{item.name}</li>
            )
        })}</ul>
    }

});


// <tr id="item1">
//     <td id="name1">Mozarella
//     </td>
//     <td><input type="text" id="text" value="50" class="input-sizeAdmin" readonly="true" > </td>
//     <td><button id="pl1" type="button" class="btn btn-style" value="+1" onClick="modifier(+1)">+</button> <button id="mn1" type="button" class="btn btn-style" value="-1" onClick="modifier(-1)">-</button>
//     </td>
//
// </tr>


ReactDOM.render(

    <Pizza  items={pizzas} source="localhost:8080/pizza"/>,
    document.getElementById('pizzas')
);



ReactDOM.render(
    <Ingredients  items={ingredients} source="localhost:8080/ingredient" />,
    document.getElementById('ingredients')

);


