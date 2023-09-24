import React, { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransaction from "../../hooks/useGetTransaction";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between w-11/12 ">
        <div className="">
          <h1>{name}</h1>
          {/* balance */}
          <div>
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
          </div>
          {/* summary */}
          <div>
            <h4> Income</h4>
            <p>${income}</p>
          </div>
          {/* Expenses */}
          <div>
            <h4>Expense</h4>
            <p>${expenses}</p>
          </div>

          {/* form */}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>

            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit"> Add Tansaction</button>
          </form>
        </div>
        {/* ProfilePhoto */}
        <div>
          {profilePhoto && (
            <div>
              <img src={profilePhoto} alt="profilePhoto" />
              <button onClick={signUserOut}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
      {/* Transaction */}
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="font-bold text-3xl">Transactions</h2>
        <ul>
          {transactions.map((transaction, index) => {
            return (
              <li key={index}>
                <h4>{transaction.description}</h4>{" "}
                <p>
                  ${transaction.transactionAmount}{" "}
                  <label>{transaction.transactionType}</label>{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
