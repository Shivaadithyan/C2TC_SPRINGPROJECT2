import React from 'react';
import './CustomerList.css';

const CustomerList = ({ customers, fetchCustomers, setEditingCustomer }) => {

  // 🗑️ Handle delete operation
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/customerservice/${id}`, {
        method: 'DELETE',
      });
      fetchCustomers(); // Refresh list after deletion
    } catch (error) {
      console.error('❌ Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-list-container">
      <h2>🛍️ Customer Records</h2>

      {customers.length === 0 ? (
        <p className="no-data">No customers available.</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Item Purchased</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
                <td>{customer.itemPurchased}</td>
                <td>₹{customer.price}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingCustomer(customer)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(customer.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
