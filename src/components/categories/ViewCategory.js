import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Pagination from '../Pagination';
import Navigation from '../Navigation';
import { BASE_URL } from '../../../src/constants';

/**
 * Component for viewing,deleting,editing and searching for categories
 */
class ViewCategory extends Component {
    state = {
      categories: [],
      q: '',
      perPage: 6,
      total: '',
    }

    componentDidMount() {
      this.getCategories();
    }

  // Function for getting categories
  getCategories = () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .get(`${BASE_URL}/api/v1/categories/`, { headers })
      .then((response) => {
        this.setState({ categories: response.data.categories, total: response.data.total });
      })
      .catch((error) => {
        if (error.response) {
          notify.show("You do not have categories yet, Please add a category", 'success', 1000);
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  }

  // Function for handling pagination
  handlePage = (event, perPage, page) => {
    event.preventDefault();
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .get(`${BASE_URL}/api/v1/categories/?page=${page}`, { headers })
      .then((response) => {
        this.setState({ categories: response.data.categories });
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message);
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  }
  // Function for deleting categories
  deleteCategories = (categoryId) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .delete(`${BASE_URL}/api/v1/categories/${categoryId}`, { headers })
      .then((response) => {
        notify.show(response.data.message, 'success');
        if (this.state.categories.length === 1) {
          this.setState({ categories: [] });
        } else {
          this.getCategories();
        }
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message);
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  }
  // Function for editing categories
  editCategories = (categoryId) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .delete(`${BASE_URL}/api/v1/categories/${categoryId}`, { headers })
      .then((response) => {
        notify.show(response.data.message, 'success', 4000);
        this.getCategories();
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

  // Function for searching for  categories
  searchCategories = (event) => {
    event.preventDefault();
    const q = event.target.q.value;
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };

    axios
      .get(`${BASE_URL}/api/v1/categories/?q=${q}`, { headers })
      .then((response) => {
        const { categories } = response.data;
        this.setState({ categories });
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
    const { categories } = this.state;
    return (

      <div className="my_container backgimg">
        <Navigation />
        <div className="mycontent">

          <form onSubmit={this.searchCategories}>
            <div className="form-group">
              Search for a category:
              <input type="text" name="q" className="form-control" placeholder="search" onChange={this.handleInputChange} value={this.state.q} />
              <button type="submit" className="btn btn-danger formsave">Search</button>
            </div>
          </form>

          <h3> Categories </h3>
          <button type="button" className="btn btn-default btn-md">
            <Link to="/add-categories">
              <span className="glyphicon glyphicon-trash" /> Add category
            </Link>

          </button>

          <div className="row">
            {
            categories.map(category => (
              <Category
                {...category}
                key={category.category_id}
                deleteCategories={() => this.deleteCategories(category.category_id)}
                category_id={category.category_id}
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

export default ViewCategory;

// Component for the cards that a populated with categories
const Category = props => (
  <div className="col-sm-6 col-md-4" >
    <div className="card">
      <div className="card-block">
        <h3 className="card-title">{props.categoryname}</h3>
        <p className="card-text">{props.category_description}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={props.deleteCategories}>
          <span className="glyphicon glyphicon-trash" />Delete
        </button>
        <Link to={`edit-categories/${props.category_id}`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit" /> Edit
        </Link>

        <Link to={`add-recipes/${props.category_id}/recipes`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit" /> Add Recipes
        </Link>

        <Link to={`view-recipes/${props.category_id}/recipes`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit" /> View Recipes
        </Link>
      </div>
    </div>
  </div>
);
