import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipename: '',
      recipe_description: '',
      instructions: '',
    };
  }
  componentWillMount() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    const catId = this.props.match.params.category_id;
    const recipeId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:5000/api/v1/categories/${catId}/recipes/${recipeId}`, { headers })
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

  handleEditRecipe = (event) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    event.preventDefault();
    const catId = this.props.match.params.category_id;
    const recipeId = this.props.match.params.id;

    axios
      .put(`http://127.0.0.1:5000/api/v1/categories/${catId}/recipes/${recipeId}`, this.state, { headers })
      .then(() => {
        notify.show("Recipe edited successfully", 'success', 4000);
        this.props.history.push(`/viewrecipes/${catId}/recipes`);
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
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand title">Yummy Recipe App</a>
            </div>
            <ul className="nav navbar-nav title">
              <li><a>Home</a></li>
              <li><a>Recipes</a></li>
              <li><a>Categories</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right title">
              <li><a><span className="glyphicon glyphicon-user" /> Hallo</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </nav>

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
