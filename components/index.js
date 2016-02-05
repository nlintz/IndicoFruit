'use strict';
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');


var FruitAPI = {
    getFruit: function(cb){
        $.get('/fruit', function(data){
            var fruits = [];
            data.forEach(function(fruit){
                fruits.push({name:fruit.name, 
                               p_exists:parseFloat(fruit.p_exists)})
            })
            fruits = fruits.sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            });
            cb(fruits)
        })
    },

    getLastUpdate: function(cb){
        $.get('/last_update', function(data){
            var last_update = new Date(data.updatedAt);
            var diff = new Date().getTime() - last_update.getTime();
            var seconds = Math.floor((diff/1000));
            cb(seconds)
        })
    }
}

var FruitCard = React.createClass({
    render: function() {
        var img_url = "/img/"+this.props.fruit.name+".jpg";
        var show_x = (this.props.fruit.p_exists < 0.5) ? "show-x" : "";
        var formatted_p_exists = this.props.fruit.p_exists.toFixed(3)
        return (
            <div className="card medium">
                <div className="card-image">
                    <img src={img_url} />
                    <img className={show_x} src="/img/X.png" />
                </div>
                <div className="card-content card-content center">
                    <span className="card-title">{this.props.fruit.name}</span>
                    <p>P({this.props.fruit.name}) = {formatted_p_exists}</p>
                </div>
            </div>
        )
    }
})

var FruitProbas = React.createClass({
    render: function() {
        var fruitCards = this.props.fruits.map(function(fruit){
            return (
                <div key={fruit.name} className="col s12 m4">
                    <FruitCard fruit={fruit}/>
                </div>
            )
        });
        return (
            <div className="main-section">
                <div className="row">
                    { fruitCards }
                </div>
            </div>
        )
    }
});

var AlertForm = React.createClass({
    render: function() {
        return (
            <div className="row alert-container">
                <form className="col s12">
                    <div className="row no-margin-left">
                        <h5>Sign Up For Alerts When We Run Out Of Fruit</h5>
                        <br/>
                        <div className="input-field col s8">
                            <input id="first_name" type="text" className="validate" />
                            <label for="first_name">Email Address</label>
                        </div>
                    </div>
                </form>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Submit</span>
                  </div>
                </div>

            </div>
        )
    }
});

var LastUpdate = React.createClass({
    render: function() {
        return (
            <div className="row last-update-container">
                <div className="col s12 center">
                    <h4>Last Updated: {this.props.last_update}</h4>
                </div>
            </div>
        )
    }
})

var Fruits = React.createClass({
    loadFruitsFromServer: function() {
        FruitAPI.getFruit(function(data){
            this.setState({
                fruits: data
            })
        }.bind(this))
    },
    loadLastUpdateFromServer: function() {
        FruitAPI.getLastUpdate(function(data){
            var formatted_update;
            if (data == "1") {
                formatted_update = data + " second ago"
            } else {
                formatted_update = data + " seconds ago"
            }

            this.setState({
                last_update: formatted_update
            })
        }.bind(this))
    },
    getInitialState: function() {
        return {fruits: [
                    {name: "apple", p_exists: 0.0},
                    {name: "orange", p_exists: 0.0},
                    {name: "banana", p_exists: 0.0}],
                last_update: ""
                }
    },
    componentWillMount: function() {
        this.loadFruitsFromServer();
        this.loadLastUpdateFromServer();
        setInterval(function() {
            this.loadFruitsFromServer();
            this.loadLastUpdateFromServer();
        }.bind(this), 5000)
    },

    render: function() {
        var fruits = this.state.fruits.map(function(obj){
            return (<li key={Math.random()}>{obj.name}</li>)
        })
        return (
            <div>
                <nav className="navigation">
                  <div className="nav-wrapper container">
                    <a href="#" className="brand-logo">Indico Fruit</a>
                  </div>
                </nav>

                <div className="container">
                    <FruitProbas fruits={this.state.fruits}/>
                    <LastUpdate last_update={this.state.last_update} />
                    <AlertForm />
                </div>
            </div>

        )
    }
})


ReactDOM.render(
    // <Products url="/products" pollInterval={2000}/>,
    <Fruits />,
    document.getElementById('content')
);
