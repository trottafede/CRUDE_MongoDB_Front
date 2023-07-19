import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./Add_User";
import UpdateUser from "./Update_User";

function Home() {
  // Want to use async/await? Add the `async` keyword to your outer function/method.
  const [users, setUsers] = useState([]);
  const url = "https://crude-mongo-db-back.vercel.app/api/users";

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url,
      });

      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "delete",
        url,
        data: {
          id,
        },
      });

      const data = await response.data;
      setUsers((prev) => prev.filter((user) => user._id !== id));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="home">
      <div className="container">
        <div className="row g-4">
          <div className="col-8">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr id={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={(e) => handleDelete(e, user._id)}
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="col-4">
            <AddUser setUsers={setUsers} url={url} />

            <UpdateUser setUsers={setUsers} url={url} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
