import React, { Component } from 'react';
import Login from './login'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { notify } from 'react-notify-toast';

const Category = props => (
  <div className="col-sm-6 col-md-4" >
    <div className="card">
      <div className="card-block">
        <h3 className="card-title">{props.categoryname}</h3>
        <p className="card-text">{props.category_description}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={props.deleteCategories}>
          <span className="glyphicon glyphicon-trash"></span> Delete 
        </button>
        
        <Link to = {`editcategories/${props.category_id}`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit"></span> Edit
        </Link>

       <Link to = {`addrecipes/${props.category_id}/recipes`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit"></span> Add Recipes
        </Link>

        <Link to = {`viewrecipes/${props.category_id}/recipes`} className="btn btn-success btn-sm" >
          <span className="glyphicon glyphicon-edit"></span> View Recipes
        </Link>
      </div>
    </div>
  </div>
 
);


class ViewCategory extends Component {
  state = {
    categories: [],
    q: ''
  }

  handleInputChange = (event)=>{
    const {name, value} = event.target;
    this.setState({[name]:value});
  }

  getCategories = () => {
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .get('http://127.0.0.1:5000/api/v1/categories/', { headers })
      .then(response => {
        const { categories } = response.data;
        this.setState({ categories })
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
    this.getCategories();
  }

  deleteCategories = (category_id) => {
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .delete(`http://127.0.0.1:5000/api/v1/categories/${category_id}`, {headers})
      .then(response => {
        notify.show(response.data.message, 'success', 4000)
        this.getCategories();
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

  editCategories = (category_id) => {
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .delete(`http://127.0.0.1:5000/api/v1/categories/${category_id}`, {headers})
      .then(response => {
        notify.show(response.data.message, 'success', 4000)
        this.getCategories();
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

  searchCategories = (event) => {
    event.preventDefault()
    const q = event.target.q.value
    let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    axios
      .get(`http://127.0.0.1:5000/api/v1/categories/?q=${q}`, { headers })
      .then(response => {
        console.log(response.data)
        const { categories } = response.data;
        this.setState({ categories })
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
    const {categories} = this.state;
    console.log(categories)
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

        <form onSubmit={this.searchCategories}>
        <div className="form-group">
            <label>Search for a category:</label>
            <input type="text" name="q" className="form-control" placeholder="search" onChange={this.handleInputChange} value={this.state.q} />
          <button type="submit" className="btn btn-danger formsave">Search</button>
          </div>
        </form>

          <h3> Categories </h3>
          <button type="button" className="btn btn-default btn-md"><Link to = '/addcategories'>
          <span className="glyphicon glyphicon-trash"></span> Add category </Link>
        </button>
          <div class="row">
          {
            categories.map((category)=>(
              <Category {...category} key={category.category_id}
              deleteCategories={() => this.deleteCategories(category.category_id)}
              category_id = {category.category_id}/>
            ))
          }
          </div>
        </div>
      </div>


    );
  }
}
      
export default ViewCategory;