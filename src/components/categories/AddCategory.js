import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../../src/constants';
import Navigation from '../other/Navigation';

/**
 * Component for  adding categories
 */
class AddCategory extends Component {
    state = {
      categoryname: '',
      category_description: '',
    }

      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }
      // Method that handles the adding of categories
      handleAddCategory = (event) => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        event.preventDefault();
        axios
          .post(`${BASE_URL}/api/v1/categories/`, this.state, { headers })
          .then((response) => {
            notify.show(response.data.message, 'success', 1000);
            this.props.history.push('/view-categories');
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

              <form onSubmit={this.handleAddCategory}>

                <div className="form-group">
                  Category Name:
                  <input type="text" name="categoryname" className="form-control categoryname" required onChange={this.handleInputChange} value={this.state.categoryname} />
                </div>
                <div className="form-group">
                  Description:
                  <input type="text" name="category_description" className="form-control category_description" required onChange={this.handleInputChange} value={this.state.category_description} />
                </div>

                <button type="submit" className="btn btn-danger formsave" >Save</button>
              </form>
            </div>

          </div>


        );
      }
}
export default AddCategory;
