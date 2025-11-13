import React, { useState, useEffect } from "react";
import "./CustomerForm.css";

const CustomerForm = ({ fetchCustomers, editingCustomer, setEditingCustomer }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [itempurchased, setItemPurchased] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editingCustomer) {
      setId(editingCustomer.id);
      setName(editingCustomer.name);
      setEmail(editingCustomer.email);
      setPassword(editingCustomer.password);
      setItemPurchased(editingCustomer.itempurchased);
      setPrice(editingCustomer.price);
      setPhone(editingCustomer.phone);
    } else {
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setItemPurchased("");
      setPrice("");
      setPhone("");
    }
  }, [editingCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { id, name, email, password };

    try {
      if (editingCustomer) {
        await fetch(`http://localhost:8081/api/customers/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        });
      } else {
        await fetch("http://localhost:8081/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        });
      }

      await fetchCustomers();
      setEditingCustomer(null);
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setItemPurchased("");
      setPrice("");
      setPhone("");
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Customer ID"
          required
          disabled={!!editingCustomer}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="itempurchased"
          value={itempurchased}
          onChange={(e) => setItemPurchased(e.target.value)}
          placeholder="ItemPurchased"
          required
        />
        <input
          type="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <button type="submit">
          {editingCustomer ? "Update" : "Add"} Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
