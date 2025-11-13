import React, { useState, useEffect } from 'react';
import './App.css';
import './styles.css';

import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/customers");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Data:", data);

    // ✅ Ensure data is always an array before setting
    if (Array.isArray(data)) {
      setCustomers(data);
    } else {
      console.error("Backend did not return an array:", data);
      setCustomers([]);
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    setCustomers([]); // fallback
  }
};


  return (
    <div className="App">
      <h1>Customer Management System</h1>
      <CustomerForm
        fetchCustomers={fetchCustomers}
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
      />
      <CustomerList
        customers={customers}
        fetchCustomers={fetchCustomers}
        setEditingCustomer={setEditingCustomer}
      />
    </div>
  );
};

export default App;
