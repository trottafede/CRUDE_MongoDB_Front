import React, { useState } from "react";
import axios from "axios";
function Update_User({ setUsers, url }) {
  const [updatedID, setUpdatedID] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEamil] = useState("");

  const handleUpdate = async (e, id, name, email) => {
    e.preventDefault();
    try {
      await axios({
        method: "patch",
        url,
        data: {
          id,
          name,
          email,
        },
      });

      setUsers((prev) =>
        prev.map((element) => {
          if (element._id === id) {
            element.name = name;
            element.email = email;
          }
          return element;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update user</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={updatedID}
            onChange={(e) => setUpdatedID(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="updatedName" className="form-label">
            Name:
          </label>
          <input
            autoComplete="on"
            type="text"
            className="form-control"
            id="updatedName"
            name="updatedName"
            placeholder="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="updatedEmail" className="form-label">
            Email address:
          </label>
          <input
            autoComplete="on"
            type="email"
            className="form-control"
            id="updatedEmail"
            name="updatedEmail"
            placeholder="name@example.com"
            value={updatedEmail}
            onChange={(e) => setUpdatedEamil(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            onClick={(e) =>
              handleUpdate(e, updatedID, updatedName, updatedEmail)
            }
            className="btn btn-outline-primary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update_User;
