import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    pizzas: [], 
    updatedPizza: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(res => res.json())
      .then(pizzaData => {
        this.setState({
        pizzas: pizzaData
      })
    })
  }

  handleEditForm = (pizza) => {
    this.setState({
      updatedPizza: pizza 
    })
  }

  // ********** Handles the update of inputs in the pizza form 

  updatePizzaOrder = (event, inputKey) => {
    let newPizzaUpdate = {...this.state.updatedPizza}
    if (inputKey === "vegetarian") {
      (event.target.value === "Vegetarian") ? newPizzaUpdate.vegetarian = true : newPizzaUpdate.vegetarian = false
    } else {
      newPizzaUpdate[inputKey] = event.target.value 
    }
    this.setState({updatedPizza: newPizzaUpdate})
  }


  // ********** Handles submit of changed pizza's input values from form, and updates pizza list  
  
  submitUpdatedPizza = () => {
    let reqPack = {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(this.state.updatedPizza)
    }
      fetch(`http://localhost:3000/pizzas/${this.state.updatedPizza.id}`, reqPack)
        .then(res => res.json())
        .then(editedPizza => {
          console.log(editedPizza)
          this.setState({
            pizzas: this.state.pizzas.map(pizza => (pizza.id === editedPizza.id ? editedPizza : pizza))
          })
        })
  }


  render() {
    return (
      <Fragment>
        <Header />
        
        <PizzaForm
          submitUpdatedPizza={this.submitUpdatedPizza} 
          updatePizzaOrder={this.updatePizzaOrder}  
          updatedPizza={this.state.updatedPizza}     
        />
        
        <PizzaList
          pizzas={this.state.pizzas}
          handleEditForm={this.handleEditForm} 
        />
        
      </Fragment>
    );
  }
}

export default App;
