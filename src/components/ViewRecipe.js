import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Navigation from './Navigation';
import Pagination from './Pagination';
import { BASE_URL } from '../../src/constants';

/**
 * viewing,deleting,editing and searching for recipes
 */

class ViewRecipe extends Component {
    state = {
      recipes: [],
      q: '',
      perPage: 6,
      total: '',
    };

    componentDidMount() {
      this.getRecipes();
    }
    // Funtion for viewing recipes
    getRecipes = () => {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      const categoryId = this.props.match.params.id;
      axios
        .get(`${BASE_URL}/api/v1/categories/${categoryId}/recipes`, { headers })
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
    // Function for deleting recipes
    deleteRecipes = (recipeId) => {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      const categoryId = this.props.match.params.id;
      axios
        .delete(`${BASE_URL}/api/v1/categories/${categoryId}/recipes/${recipeId}`, { headers })
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

    // Function for searchingfor recipes
  searchRecipes = (event) => {
    event.preventDefault();
    const q = event.target.q.value;
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    const catId = this.props.match.params.id;
    axios
      .get(`${BASE_URL}/api/v1/categories/${catId}/recipes?q=${q}`, { headers })
      .then((response) => {
        this.setState({ recipes: response.data.recipes });
        if (this.state.q === '') {
          if (!this.handleInputChange) {
            this.getRecipes();
          }
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
  // Function for handling page
  handlePage = (event, perPage, page) => {
    event.preventDefault();
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    const catId = this.props.match.params.id;
    axios
      .get(`${BASE_URL}/api/v1/categories/${catId}/recipes?page=${page}`, { headers })
      .then((response) => {
        this.setState({ recipes: response.data.recipes });
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message);
        } else if (error.request) {
          notify.show("Request not made");
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
            <Link to={`/add-recipes/${catId}/recipes`}>
              <span className="glyphicon glyphicon-trash" /> Add recipes
            </Link>
          </button>

          <div className="row">

            {/* Functionality to map Recipes to a specific card */}
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
          <Pagination
            perPage={this.state.perPage}
            total={this.state.total}
            handlePage={this.handlePage}
          />
        </div>
      </div>


    );
  }
}

export default ViewRecipe;

// Component for the cards that a populated with recipes
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

        <Link to={`/edit-recipes/${props.category_identity}/recipes/${props.recipe_id}`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit" /> Edit
        </Link>

      </div>
    </div>
  </div>

);
