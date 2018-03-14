import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Navigation from './Navigation';

const Recipe = props => (
  <div className="col-sm-6 col-md-4" >
    <div className="card">
      <div className="card-block">
        <h3 className="card-title">{props.recipename}</h3>
        <p className="card-text">{props.recipe_description}</p>
        <p className="card-text">{props.instructions}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={props.deleteRecipes}>
          <span className="glyphicon glyphicon-trash" /> Delete
        </button>

        <Link to={`/editrecipes/${props.category_id}/recipes/${props.recipe_id}`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit" /> Edit
        </Link>

      </div>
    </div>
  </div>

);


class ViewRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      q: '',
    };
  }
  componentDidMount() {
    this.getRecipes();
  }
    getRecipes = () => {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      const categoryId = this.props.match.params.id;
      axios
        .get(`http://127.0.0.1:5000/api/v1/categories/${categoryId}/recipes`, { headers })
        .then((response) => {
          this.setState({ recipes: response.data.recipes });
        })
        .catch((error) => {
          if (error.response) {
            notify.show("You donot have recipes yet, Please add a recipe", 'success', 4000);
          } else if (error.request) {
            notify.show("Request not made");
          }
        });
    }

    deleteRecipes = (recipeId) => {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      const categoryId = this.props.match.params.id;
      axios
        .delete(`http://127.0.0.1:5000/api/v1/categories/${categoryId}/recipes/${recipeId}`, { headers })
        .then((response) => {
          notify.show(response.data.message, 'success', 4000);
          if (this.state.recipes.length === 1) {
            this.setState({ recipes: [] });
          } else {
            this.getRecipes();
          }
        })

        .catch((error) => {
          if (error.response) {
            notify.show(error.response.data.message, 'success');
          } else if (error.request) {
            notify.show("Request not made");
          }
        });
    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

  searchRecipes = (event) => {
    event.preventDefault();
    const q = event.target.q.value;
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    const catId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:5000/api/v1/categories/${catId}/recipes?q=${q}`, { headers })
      .then((response) => {
        this.setState({ recipes: response.data.recipes });
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message, 'success');
        } else if (error.request) {
          alert("Request not made");
        }
      });
  }

  render() {
    const recipes = this.state.recipes;
    const catId = this.props.match.params.id;
    return (
      <div className="my_container backgimg">
        <Navigation />
        <div className="mycontent">

          <form onSubmit={this.searchRecipes}>
            <div className="form-group">
            Search for a recipe:
              <input type="text" name="q" className="form-control" placeholder="search" onChange={this.handleInputChange} value={this.state.q} />
              <button type="submit" className="btn btn-danger formsave">Search</button>
            </div>
          </form>

          <h3> Recipes </h3>

          <button type="button" className="btn btn-default btn-md">
            <Link to={`/addrecipes/${catId}/recipes`}>
              <span className="glyphicon glyphicon-trash" /> Add recipes
            </Link>
          </button>

          <div className="row">
            {
            recipes.map(recipe => (
              <Recipe
                {...recipe}
                key={recipe.recipe_id}
                deleteRecipes={() => this.deleteRecipes(recipe.recipe_id)}
              />
            ))
          }
          </div>
          <div className="row" />
        </div>
      </div>


    );
  }
}

export default ViewRecipes;
