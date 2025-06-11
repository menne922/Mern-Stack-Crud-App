import React, { Component } from "react";
import './AddStudent.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudent extends Component {
  state = {
    name: "",
    birthday: "",
    email: "",
    enrollnumber: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addStudent = async e => {
    e.preventDefault();
    try {
      const { name, birthday, email, enrollnumber } = this.state;
      const newStudent = await axios.post("/api/students/", {
        name,
        birthday,
        email,
        enrollnumber
      });

      toast(`Student ${newStudent.data.newStudent.name} created successfully`, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000
      });

      this.setState({ name: "", birthday: "", email: "", enrollnumber: "" }); // clear form
    } catch (err) {
      toast(err.message, {
        type: toast.TYPE.ERROR,
        autoClose: 3000
      });
    }
  };

  render() {
    const { name, birthday, email, enrollnumber } = this.state;

    return (
      <div className="AddStudent-Wrapper">
        <h1>Add Student:</h1>
        <form onSubmit={this.addStudent}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChangeHandler}
            placeholder="Enter the name of the student"
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
            id="name"
          />

          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={this.onChangeHandler}
            className="Add-Student-Input"
            required
            id="birthday"
          />

          <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            placeholder="Enter your email"
            className="Add-Student-Input"
            required
            id="email"
          />

          <label htmlFor="enrollnumber">Enrollment Number:</label>
          <input
            type="number"
            name="enrollnumber"
            value={enrollnumber}
            onChange={this.onChangeHandler}
            placeholder="0 to 120"
            min="1"
            max="120"
            className="Add-Student-Input"
            required
            id="enrollnumber"
          />

          <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"
            onClick={() => this.setState({ name: "", birthday: "", email: "", enrollnumber: "" })}>
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddStudent;