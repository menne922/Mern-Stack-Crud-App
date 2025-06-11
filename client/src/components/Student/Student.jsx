import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

const Student = ({ _id, name, birthday, email, enrollnumber, removeStudent }) => {
  const formattedBirthday = birthday
    ? new Date(birthday).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <tr>
      <td>{name}</td>
      <td>{formattedBirthday}</td>
      <td>{email}</td>
      <td>{enrollnumber}</td>
      <td>
        <button onClick={() => removeStudent(_id)} className="Action-Button fa fa-trash"></button>
        <Link to={`/edit/${_id}`}>
          <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>
    </tr>
  );
};

export default Student;
