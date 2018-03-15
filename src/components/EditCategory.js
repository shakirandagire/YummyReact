import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../src/constants';
import Navigation from './Navigation';

/**
 * Component for editing categories
 */
class EditCategory extends Component {
    state = {
      categoryname: '',
      category_description: '',
    }
    // Component for populating the fields of the edit form
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

      // Function to handle the editing of the categories

      handleEditCategory = (event) => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        event.preventDefault();
        const categoryId = this.props.match.params.id;
        axios
          .put(`http://127.0.0.1:5000/api/v1/categories/${categoryId}`, this.state, { headers })
          .then(() => {
            notify.show("Category edited successfully", 'success', 4000);
            this.props.history.push('/view-categories');
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
            <Navigation />

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
