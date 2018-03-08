import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {notify} from 'react-notify-toast';

class EditCategory extends Component{
    state = {
        categoryname: '',
        category_description: '',
      }

      componentWillMount(){
        let headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
        let category_id = this.props.match.params.id
        axios
          .get(`http://127.0.0.1:5000/api/v1/categories/${category_id}`, { headers })
          .then(response => {
              console.log(response.data)
            const category = response.data;
            this.setState({ 
                categoryname: category.categoryname,
                category_description: category.category_description})
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
    
      handleInputChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value});
      }
    
      handleEditCategory = (event) => {
        let headers = {Authorization: `Bearer ${localStorage.getItem('accessToken')}`};
        event.preventDefault();
        let category_id = this.props.match.params.id
        axios
        .put(`http://127.0.0.1:5000/api/v1/categories/${category_id}`,this.state, {headers})
        .then(response =>{
          notify.show(response.data.message, 'success', 4000);
          this.props.history.push('/viewcategories');
        })
        .catch(error => {
            if (error.response)
            {
              alert(error.response.data.message)
            }
            else if(error.request){
              alert("Request not made")
    
            }
          });
      }

    render(){
        return(
        <div className ="my_container backgimg">
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

      <div className = "mycontent">

      <form onSubmit={this.handleEditCategory}>
      
      <div className="form-group">
        <label>Category Name:</label>
        <input type="text" name="categoryname" className="form-control" required onChange={this.handleInputChange} value={this.state.categoryname} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input type="text" name = "category_description" className="form-control" required onChange={this.handleInputChange} value={this.state.category_description}/>
      </div>

    <button type="submit" className="btn btn-danger formsave" >Save</button>
    </form>
    </div>
    
     </div>
     

           
        );
    }
}
export default EditCategory;