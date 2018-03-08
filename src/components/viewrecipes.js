import React, { Component } from 'react';
import Login from './login'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { notify } from 'react-notify-toast';

const Recipe = props => (
  <div className="col-sm-6 col-md-4" >
    <div className="card">
      <div className="card-block">
        <h3 className="card-title">{props.recipename}</h3>
        <p className="card-text">{props.recipe_description}</p>
        <p className="card-text">{props.instructions}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={props.deleteRecipes}>
          <span className="glyphicon glyphicon-trash"></span> Delete 
        </button>

        <Link to = {`/editrecipes/${props.category_id}/recipes/${props.recipe_id}`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit"></span> Edit
        </Link>

      </div>
    </div>
  </div>
 
);


class ViewRecipes extends Component {
    constructor(props) {
        super(props);
        this.state ={
            recipes: [],
            q: ''
        }
    }

    handleInputChange = (event)=>{
      const {name, value} = event.target;
      this.setState({[name]:value});
    }
    getRecipes = () => {
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    let category_id = this.props.match.params.id
    axios
      .get(`http://127.0.0.1:5000/api/v1/categories/${category_id}/recipes`, { headers })
      .then(response => {
        this.setState({recipes: response.data.recipes})
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

    componentDidMount() {
    this.getRecipes();
    }


    deleteRecipes = (recipe_id) => {
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    let category_id = this.props.match.params.id
    axios
      .delete(`http://127.0.0.1:5000/api/v1/categories/${category_id}/recipes/${recipe_id}`, {headers})
      .then(response => {
        notify.show(response.data.message, 'success', 4000)
        this.getRecipes();
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

  searchRecipes = (event) => {
    event.preventDefault()
    const q = event.target.q.value
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    let cat_id = this.props.match.params.id
    axios
      .get(`http://127.0.0.1:5000/api/v1/categories/${cat_id}/recipes?q=${q}`, { headers })
      .then(response => {
        this.setState({ recipes: response.data.recipes })
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
  
  render() {
    const recipes = this.state.recipes;
    return (
      <div className="my_container backgimg">
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

        <div className="mycontent">

        <form onSubmit={this.searchRecipes}>
        <div className="form-group">
            <label>Search for a recipe:</label>
            <input type="text" name="q" className="form-control" placeholder="search" onChange={this.handleInputChange} value={this.state.q} />
          <button type="submit" className="btn btn-danger formsave">Search</button>
          </div>
        </form>

          <h3> Recipes </h3>
          <div class="row">
          {
            recipes.map((recipe)=>(
              <Recipe {...recipe} key={recipe.recipe_id} 
              deleteRecipes={() => this.deleteRecipes(recipe.recipe_id)}
              recipe_id = {recipe.recipe_id}
              category_id = {this.props.match.params.id}
              />
            ))
          }
          </div>
        </div>
      </div>


    );
  }
}
      
export default ViewRecipes;