import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../src/constants';


class EditCategory extends Component {
    state = {
      categoryname: '',
      category_description: '',
    }

    componentWillMount() {
      const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
      const categoryId = this.props.match.params.id;
      axios
        .get(`${BASE_URL}/api/v1/categories/${categoryId}`, { headers })
        .then((response) => {
          const category = response.data;
          this.setState({
            categoryname: category.categoryname,
            category_description: category.category_description });
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

      handleEditCategory = (event) => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        event.preventDefault();
        const categoryId = this.props.match.params.id;
        axios
          .put(`http://127.0.0.1:5000/api/v1/categories/${categoryId}`, this.state, { headers })
          .then(() => {
            notify.show("Category edited successfully", 'success', 4000);
            this.props.history.push('/viewcategories');
          })
          .catch((error) => {
            if (error.response) {
              notify.show(error.response.data.message, 'success');
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

              <form onSubmit={this.handleEditCategory}>

                <div className="form-group">
                  Category Name:
                  <input type="text" name="categoryname" className="form-control" required onChange={this.handleInputChange} value={this.state.categoryname} />
                </div>
                <div className="form-group">
                  Description:
                  <input type="text" name="category_description" className="form-control" required onChange={this.handleInputChange} value={this.state.category_description} />
                </div>

                <button type="submit" className="btn btn-danger formsave" >Save</button>
              </form>
            </div>

          </div>


        );
      }
}
export default EditCategory;
