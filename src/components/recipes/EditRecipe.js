import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../../src/constants';
import Navigation from '../Navigation';

/**
 * Component for editing recipes
 */

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipename: '',
      recipe_description: '',
      instructions: '',
    };
  }
  // Function that populates the edit recipes form
  componentWillMount() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    const catId = this.props.match.params.category_id;
    const recipeId = this.props.match.params.id;
    axios
      .get(`${BASE_URL}/api/v1/categories/${catId}/recipes/${recipeId}`, { headers })
      .then((response) => {
        this.setState({
          recipename: response.data.recipename,
          recipe_description: response.data.recipe_description,
          instructions: response.data.instructions,
        });
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message);
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  // Function that handles the editting of recipes

  handleEditRecipe = (event) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    event.preventDefault();
    const catId = this.props.match.params.category_id;
    const recipeId = this.props.match.params.id;
    axios
      .put(`${BASE_URL}/api/v1/categories/${catId}/recipes/${recipeId}`, this.state, { headers })
      .then(() => {
        notify.show("Recipe edited successfully", 'success', 4000);
        this.props.history.push(`/view-recipes/${catId}/recipes`);
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message, 'success', 4000);
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  }

  render() {
    return (
      <div className="my_container backgimg">
        <Navigation />
        <div className="mycontent">

          <form onSubmit={this.handleEditRecipe}>

            <div className="form-group">
              Recipe Name:
              <input type="text" name="recipename" className="form-control" required onChange={this.handleInputChange} value={this.state.recipename} />
            </div>
            <div className="form-group">
              Description:
              <input type="text-area" name="recipe_description" className="form-control" required onChange={this.handleInputChange} value={this.state.recipe_description} />
            </div>
            <div className="form-group">
              Instructions:
              <input type="text-area" name="instructions" className="form-control" required onChange={this.handleInputChange} value={this.state.instructions} />
            </div>

            <button type="submit" className="btn btn-danger formsave" >Save</button>
          </form>
        </div>

      </div>


    );
  }
}
export default EditRecipe;
