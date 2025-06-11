import React, { Component } from "react";
import './EditStudent.css';
import axios from "axios";
import { withRouter } from 'react-router';
import { toast, ToastContainer } from "react-toastify";

class EditStudent extends Component {
  state = {
    id: '',
    name: '',
    birthday: '',
    email: '',
    enrollnumber: '',
    response: ''
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    console.log("Edit route param ID:", this.props.match.params.id);
    try {
      const id = this.props.match.params.id;
      console.log("Loading student with ID:", id);
      const res = await axios.get(`/api/students/${ id }`);
      const { name, birthday, email, enrollnumber } = res.data.student;

      this.setState({
        id,
        name,
        birthday: birthday ? new Date(birthday).toISOString().split("T")[0] : '',
        email,
        enrollnumber
      });
    } catch (err) {
      console.error("Error loading student:", err);
      this.setState({ response: "Student not found!" });
    }
  }

  updateStudentHandler = async e => {
    e.preventDefault();
    try {
      const { id, name, birthday, email, enrollnumber } = this.state;
      const res = await axios.put(`/api/students/${id}`, {
        name,
        birthday,
        email,
        enrollnumber
      });

      toast(res.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };
  render() {
    console.log("🟢 EditStudent is rendering!");
    console.log("State:", this.state);

    if (this.state.response === "Student not found!") return <h1>Student not found!</h1>;

    const { name, birthday, email, enrollnumber } = this.state;

    return (
      <div className="Edit-Student-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateStudentHandler}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name..."
            name="name"
            value={name}
            onChange={this.onChangeHandler}
            required
            className="Edit-Student-Input"
            id="name"
          />

          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={this.onChangeHandler}
            className="Edit-Student-Input"
            required
            id="birthday"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email here"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            required
            className="Edit-Student-Input"
            id="email"
          />

          <label htmlFor="enrollnumber">Enrollment Number:</label>
          <input
            type="number"
            name="enrollnumber"
            value={enrollnumber}
            onChange={this.onChangeHandler}
            min="1"
            max="120"
            required
            className="Edit-Student-Input"
            id="enrollnumber"
          />

          <button type="submit" className="Edit-Student-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditStudent);