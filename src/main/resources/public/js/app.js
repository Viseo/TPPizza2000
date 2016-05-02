var tmpIngredients = [];
class ElemPizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            number : props.number
        };
    }
    render() {
        return <div className="col-md-6 text-center pizza" id={this.props.indexP}>
            <h3>{this.props.name}
                <div className="btn btn-style-2 btn-circle btn-lg" id={this.props.index}>{this.state.number}</div>
            </h3>
            <img className="imagepizza" src={this.props.url}/>
            <div className="center-block">
                <button onClick={this.onChange.bind(this, this.props)} className="btn btn-style">Cuisiner</button>
            </div>
        </div>
    }

    onChange() {
        //this.setState({tmpIngredients : this.state.tmpIngredients.push(e.value)});
        var pizza = {
            "name": this.props.name,
            "ingredients": this.props.ingredients,
            "number": parseInt(this.props.number),
            "url": this.props.url
        };
        var data = {"ingredient": tmpIngredients, "pizza": pizza};
        var index = this.props.index;
        $.ajax({
            url: this.props.target,
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                var alert = document.getElementById("alert");
                alert.innerHTML = '';
                $('#alert').removeClass("custom-alert");
                $('#alert').removeClass("hide-alert");
                $('#alert').removeClass("alert-success");
                $('#alert').removeClass("alert-danger");
                $('#alert').removeClass("show-alert");

                console.log(data.length);
                if (data.length === 0) {
                    this.setState({number: this.state.number + 1});
                    var num = document.getElementById(index.toString());
                    //num.innerHTML = (parseInt(num.innerHTML) + 1).toString();
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
                    var message = "Il vous manque quelques ingredients : ";

                    data.map(function (elem) {
                        message += "<strong>" + elem.name + "</strong>";
                    });

                    $('#alert').addClass("alert-danger");
                    $('#alert').addClass("show-alert");
                    alert.innerHTML = message;
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
            error: function (xhr, status, err) {
                //this.setState({data: data});
                //console.error(this.props.url, status, err.toString());
                console.log(data);
            }.bind(this)
        });
    }
}
// Component <Pizza/> Contain List Of Pizzas

class Pizza extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            pizzas: [],
            count : 0
        };
    }

    componentDidMount() {
    $.ajax({
        url: this.props.source,
        datatype: 'json',
        cache: false,
        success: function (data) {
            this.setState({pizzas: data});
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.source, status, err.toString());
        }.bind(this)
    });
}
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render() {
        // Generation of virtual DOM row pizza
        return <div>{this.state.pizzas.map(function (item, index) {
            return <ElemPizza key={item.name} name={item.name} number={item.number}
                              ingredients={item.ingredients} url={item.url} target="http://localhost:8080/admin/cooker"
                              index={index} indexP={'id-pizza-'+index}/>
        })}</div>;
    }
}

class ElemIngredient extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count : 0
        };
    }
    onAdd(props) {
        // Add ingredient in memory stock
        this.setState({count: this.state.count + 1});
        var ingredient = {};
        ingredient.name = props.name;
        ingredient.quantite = 1;
        tmpIngredients = tmpIngredients.concat(ingredient);

        jsonCanCook();
    }
    onMinus(props) {

        if (this.state.count > 0)
            this.setState({count: this.state.count - 1});
        // Add ingredient in memory stock
        var elem = tmpIngredients.find(function (elem) {
            return elem.name == props.name;
        });
        var index = tmpIngredients.indexOf(elem);
        if (elem)tmpIngredients.splice(index, 1);

        jsonCanCook();
    }

    render() {
        return <div key={this.props.name} className="row ingredient ">
            <img src={this.props.url} className="img-ingredient col-md-3 "/>
            <div className="col-md-5 description ">{this.props.name}</div>
            <div className="btn btn-style-2 btn-circle btn-lg col-md-1 ">{this.state.count}</div>

            <button onClick={this.onAdd.bind(this, this.props)} className="btn btn-style col-md-1 btn-plus-moins ">+
            </button>
            <button onClick={this.onMinus.bind(this, this.props)} className="btn btn-style col-md-1 btn-plus-moins ">-
            </button>
        </div>
    }
}
class Ingredients extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        };
    }
    componentDidMount() {
        // Get pizzas
        $.ajax({
            url: this.props.source,
            datatype: 'json',
            cache: false,
            success: function (data) {
                this.setState({ingredients: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
        // Get ingerdients
        $.ajax({
            url: this.props.source,
            datatype: 'json',
            cache: false,
            success: function (data) {
                this.setState({pizzas: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }


    render() {

        return <div>
            {this.state.ingredients.map(function (item, index) {
                return <ElemIngredient key={item.name} name={item.name} url={item.url}/>
            })
        }
        </div>
    }
}

ReactDOM.render(
    <Pizza source="http://localhost:8080/admin/pizza"/>,
    document.getElementById('pizzas')
);

ReactDOM.render(
    <Ingredients source="http://localhost:8080/admin/ingredient"/>,
    document.getElementById('ingredients')
);


function jsonCanCook() {

    if (getCookie("toogleIsSelected") === "false") {
        var pizzas = document.getElementsByClassName("pizza");
        [].forEach.call(pizzas, function (piz) {
            var str = piz.children[0].innerText;
            var newStr = str.replace(/\d+/g, "");
            piz.style.display = "block";
        });
    } else {
        var pizzas = document.getElementsByClassName("pizza");
        [].forEach.call(pizzas, function (piz) {
            var str = piz.children[0].innerText;
            var newStr = str.replace(/\d+/g, "");
            piz.style.display = "none";
        });
        var dataToSend = tmpIngredients.map(function (obj) {
            return {name: obj.name, url: ''}
        });
        var data = {"ingredient": dataToSend};
        console.log(data);

        $.ajax({
            url: "http://localhost:8080/admin/cancook",
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                // afficher les pizza qui son retourner par le serveur
                var pizzas = document.getElementsByClassName("pizza");
                [].forEach.call(pizzas, function (piz) {
                    var str = piz.children[0].innerText;
                    var newStr = str.replace(/\d+/g, "");
                    data.forEach(function (d) {
                        if (d.name.toString() === newStr.toString()) {
                            piz.style.display = "block";
                        }
                    });
                });
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
}

var _toogleIsClick = false;
var _toogle = false;
$("#toogleIsClicked").click(function () {
    if (_toogleIsClick) {
        checkCookie();
        console.log("toogle: " + _toogle);
        _toogleIsClick = false;
    } else {
        _toogleIsClick = true;
    }
    jsonCanCook();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

$(document).ready(function () {
    var checkbox = document.getElementById("cmn-toggle-5");
    if (getCookie("toogleIsSelected") === "true") {
        checkbox.checked = true;
        _toogle = true;
    } else {
        checkbox.checked = false;
        _toogle = false;
    }
    jsonCanCook();
});

jsonCanCook();