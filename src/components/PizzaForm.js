import React from "react"

const PizzaForm = (props) => {

  return(
      <div className="form-row">
      
      <div className="col-5">
        <input type="text" className="form-control" placeholder="Pizza Topping"
          value={
          props.updatedPizza ? props.updatedPizza.topping : ""}
          onChange={(event) => props.updatePizzaOrder(event, "topping")}
          />
      </div>
      
      <div className="col">
        <select value={props.updatedPizza ? props.updatedPizza.size : ""} className="form-control"
        onChange={(event) => props.updatePizzaOrder(event, "size")}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
      </div>
      
      <div className="col">
          <div className="form-check">
          <input className="form-check-input" type="radio" value="Vegetarian"
            checked={(props.updatedPizza.vegetarian) ? true : false} 
            onChange={(event) => props.updatePizzaOrder(event, "vegetarian")}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
      </div>
        
      <div className="form-check">
          <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.updatedPizza.vegetarian}
            onChange={(event) => props.updatePizzaOrder(event, "vegetarian")}
          />
            <label className="form-check-label">
              Not Vegetarian
            </label>
      </div>
      
      </div>
      
      <div className="col">
        <button type="submit" className="btn btn-success"
          onClick={props.submitUpdatedPizza}>Submit</button>
      </div>

    </div>

  )
}


export default PizzaForm
