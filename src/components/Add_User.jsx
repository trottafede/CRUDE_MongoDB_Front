import React, { useState } from "react";
import axios from "axios";

function Add_User({ setUsers, url }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url,
        data: {
          name,
          email,
        },
      });

      const data = await response.data;
      setUsers((prev) => [...prev, data]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Add user</h2>
      <form onSubmit={createUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            autoComplete="on"
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Federico"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address:
          </label>
          <input
            autoComplete="on"
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-outline-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add_User;
