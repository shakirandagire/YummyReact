import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {notify} from 'react-notify-toast';
import AddCategory from './addcategories'

class EditRecipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipename: '',
            recipe_description: '',
            instructions: '',
          }
    }
      componentWillMount(){
        let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        let cat_id = this.props.match.params.category_id
        let recipe_id = this.props.match.params.id
        axios
          .get(`http://127.0.0.1:5000/api/v1/categories/${cat_id}/recipes/${recipe_id}`, { headers })
          .then(response => {
            this.setState({ 
                recipename: response.data.recipename,
                recipe_description: response.data.recipe_description,
                instructions: response.data.instructions})
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            }
            else if (error.request) {
              alert("Request not made")
    
            }
          });
      }
    
      handleInputChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value});
      }
    
      handleEditRecipe = (event) => {
        let headers = {Authorization: `Bearer ${localStorage.getItem('accessToken')}`};
        event.preventDefault();
        let cat_id = this.props.match.params.category_id
        let recipe_id = this.props.match.params.id

        axios
        .put(`http://127.0.0.1:5000/api/v1/categories/${cat_id}/recipes/${recipe_id}`,this.state, {headers})
        .then(response =>{
          console.log(response.data.message)
          notify.show(response.data.message, 'success', 4000);
          this.props.history.push(`/viewrecipes/${cat_id}/recipes`);
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

      <form onSubmit={this.handleEditRecipe}>
      
      <div className="form-group">
        <label>Recipe Name:</label>
        <input type="text" name="recipename" className="form-control" required onChange={this.handleInputChange} value={this.state.recipename} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input type="text-area" name = "recipe_description" className="form-control" required onChange={this.handleInputChange} value={this.state.recipe_description}/>
      </div>
      <div className="form-group">
        <label>instructions:</label>
        <input type="text-area" name = "instructions" className="form-control" required onChange={this.handleInputChange} value={this.state.instructions}/>
      </div>

    <button type="submit" className="btn btn-danger formsave" >Save</button>
    </form>
    </div>
    
     </div>
     

           
        );
    }
}
export default EditRecipe;