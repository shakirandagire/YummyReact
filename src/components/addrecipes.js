import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {notify} from 'react-notify-toast';

class AddRecipe extends Component{
  constructor(){
    super();
    this.state = {
      recipename: '',
      recipe_description: '',
      instructions: '',
    }
  }
      handleInputChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value});
      }
    
      handleAddRecipe = (event) => {
        let headers = {Authorization: `Bearer ${localStorage.getItem('accessToken')}`};
        let category_id = this.props.match.params.id
        const payload = {
          recipename: this.state.recipename,
          recipe_description: this.state.recipe_description,
          instructions: this.state.instructions
        }
        event.preventDefault();
        axios
        .post(`http://127.0.0.1:5000/api/v1/categories/${category_id}/recipes`,payload, {headers})
        .then(response =>{
          notify.show(response.data.message, 'success', 4000);
          this.props.history.push(`/viewrecipes/${category_id}/recipes`);
          
        })
        .catch(error => {
            if (error.response)
            {
              alert(error.response.data.message)
            }
            else if(error.request){
              alert("Request not made")
    
            }
          });
      }

    render(){
        return(
        <div className ="my_container backgimg">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand title" href="#">Yummy Recipe App</a>
            </div>
            <ul className="nav navbar-nav title">
              <li><a>Home</a></li>
              <li><a>Recipes</a></li>
              <li><a>Categories</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right title">
              <li><a><span className="glyphicon glyphicon-user"></span> Hallo</a></li>
              <li><a>Logout</a></li>
            </ul>
            </div>
        </nav>

      <div className = "mycontent">

      <form onSubmit={this.handleAddRecipe}>
      
      <div className="form-group">
        <label>Recipe Name:</label>
        <input type="text" name="recipename" className="form-control" required onChange={this.handleInputChange} value={this.state.recipename} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input type="text_area" name = "recipe_description" className="form-control" required onChange={this.handleInputChange} value={this.state.recipe_description}/>
      </div>
      <div className="form-group">
        <label>Instructions:</label>
        <input type="text_area" name = "instructions" className="form-control" required onChange={this.handleInputChange} value={this.state.instructions}/>
      </div>

    <button type="submit" className="btn btn-danger formsave" >Save</button>
    </form>
    </div>
    
     </div>
           
        );
    }
}
export default AddRecipe;