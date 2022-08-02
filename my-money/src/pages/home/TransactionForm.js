import React from "react";
import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      // id of the user
      uid,
      // transaction name
      name,
      // transaction amount
      amount,
    });
  };
  //wait for successful database addition
  useEffect(() => {
    console.log("Is succesful? "+response.success)
    if(response.success){
      console.log("Success. Resetting forms")
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount (£):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
}
