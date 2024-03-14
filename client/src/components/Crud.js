import React, { useState, useEffect } from "react";

const Crud = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
  const [getList, setGetList] = useState([]);
  const [edit, setEdit] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAge, setEditAge] = useState(0);
  const [editGender, setEditGender] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    getListOfProducts();
  }, []);

  const handleSubmit = async () => {
    if (name && email && age && gender && salary) {
      const result = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age, gender, salary }),
      });
      await result.json();
      alert("Data Added Successfully!");
      getListOfProducts();
    } else {
      alert("Please Enter Valid Data");
    }
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setSalary("");
  };

  const getListOfProducts = async () => {
    const result = await fetch("http://localhost:8080");
    const data = await result.json();
    setGetList(data);
  };

  const handleDelete = async (id) => {
    const result = await fetch(`http://localhost:8080/delete/${id}`, {
      method: "DELETE",
    });
    await result.json();
    alert("Data Deleted Successfully!");
    getListOfProducts();
  };

  const handleUpdate = async (items, e) => {
    e.preventDefault();
    setEdit(items);
    setID(items._id);
    setEditName(items.name);
    setEditEmail(items.email);
    setEditAge(items.age);
    setEditGender(items.gender);
    setEditSalary(items.salary);
  };

  const handleEdit = async () => {
    const result = await fetch(`http://localhost:8080/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName,
        age: Number(editAge),
        email: editEmail,
        gender: editGender,
        salary: Number(editSalary),
      }),
    });
    await result.json();
    getListOfProducts();
    alert("Data Updated Successfully!");
  };

  return (
    <div className="container">
      <h1>Add New Employee</h1>
      <div className="row">
        <div className="col-md-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="name"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="email"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form-control"
            placeholder="age"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-control"
            placeholder="gender"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="form-control"
            placeholder="salary"
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>

      <div className="perl-list mt-4">
        <h1>Employee List</h1>
        <ul className="list-unstyled">
          <li>S.No</li>
          <li>name</li>
          <li>email</li>
          <li>age</li>
          <li>gender</li>
          <li>salary</li>
          <li>Operations</li>
        </ul>
        {getList.map((item, index) => (
          <ul className="list-unstyled" key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.email}</li>
            <li>{item.age}</li>
            <li>{item.gender}</li>
            <li>{item.salary}</li>
            <li>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={(e) => handleUpdate(item, e)}
              >
                UPDATE
              </button>
            </li>
          </ul>
        ))}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleEdit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  defaultValue={edit.name}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-control"
                  placeholder="name"
                />
                <input
                  type="text"
                  defaultValue={edit.email}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="form-control"
                  placeholder="email"
                />
                <input
                  type="text"
                  defaultValue={edit.age}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="form-control"
                  placeholder="age"
                />
                <input
                  type="text"
                  defaultValue={edit.gender}
                  onChange={(e) => setEditGender(e.target.value)}
                  className="form-control"
                  placeholder="gender"
                />
                <input
                  type="text"
                  defaultValue={edit.salary}
                  onChange={(e) => setEditSalary(e.target.value)}
                  className="form-control"
                  placeholder="salary"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
