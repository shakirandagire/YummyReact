import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Navigation from './Navigation';
import { BASE_URL } from '../../src/constants';

/**
 * Component for adding recipes
 */

class AddRecipe extends Component {
    state = {
      recipename: '',
      recipe_description: '',
      instructions: '',
    }

      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }
      // Method that handles adding of recipes

      handleAddRecipe = (event) => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        const categoryId = this.props.match.params.id;
        const payload = {
          recipename: this.state.recipename,
          recipe_description: this.state.recipe_description,
          instructions: this.state.instructions,
        };
        event.preventDefault();
        axios
          .post(`${BASE_URL}/api/v1/categories/${categoryId}/recipes`, payload, { headers })
          .then((response) => {
            notify.show(response.data.message, 'success', 4000);
            this.props.history.push(`/view-recipes/${categoryId}/recipes`);
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
        return (
          <div className="my_container backgimg">
            <Navigation />

            <div className="mycontent">

              <form onSubmit={this.handleAddRecipe}>

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
                  <textarea name="instructions" className="form-control" required onChange={this.handleInputChange} value={this.state.instructions} />
                </div>

                <button type="submit" className="btn btn-danger formsave" >Save</button>
              </form>
            </div>

          </div>

        );
      }
}
export default AddRecipe;
