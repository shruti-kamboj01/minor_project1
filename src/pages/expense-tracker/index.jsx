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

    setDescription("");
    setTransactionAmount("");
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

  // const deleteExpense = (id) => {
  //     const updateExpense = transactionAmount.filter((x) => x.id !== id);
  //     setTransactionAmount(updateExpense);
  //     setTransactionAmount(updateExpense);
  //     setDescription(updateExpense);
  // };

  return (
    <div className="w-11/12 max-w-maxContent font-inter">
    <div className="flex justify-center text-richblue-900  
    mt-2 font-bold text-6xl cursor-default">
    Expense Tracker</div>
    <h1 className=" mt-5 text-4xl font-semibold text-center cursor-default text-richblue-900">{name}</h1>
      <div className="flex justify-evenly">
        <div className="">
          {/* balance */}
          <div className="cursor-default">
            <h3 className="font-bold text-xl ">Your Balance</h3>
            {balance >= 0 ? <h2 className="ml-2 font-medium text-lg"> ${balance}</h2> : <h2 className="ml-2 font-medium text-lg"> -${balance * -1}</h2>}
          </div>
          {/* summary */}
          <div className="mt-2 cursor-default">
            <h4 className="font-bold text-xl "> Income</h4>
            <p className="ml-2 font-medium text-lg">${income}</p>
          </div>
          {/* Expenses */}
          <div className="mt-2 mb-4 cursor-default">
            <h4 className="font-bold text-xl ">Expense</h4>
            <p className="ml-2 font-medium text-lg">${expenses}</p>
          </div>

          {/* form */}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mr-2 pl-1 rounded-md p-1 outline-richblack-300"
            />

            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="mr-2 pl-1 rounded-md p-1 outline-richblack-300"
            />

            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="expense" className="mr-2 ml-1 text-base font-semibold">Expense</label>

            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="income" className="mr-2 ml-1 text-base font-semibold">Income</label>

            <button type="submit" className="bg-richblue-800 mt-3 text-richblue-5 py-2 px-4 rounded-2xl hover:bg-richblue-25 hover:border-2 hover:font-bold hover:text-richblue-800 transition-all duration-200"> Add Tansaction</button>
          </form>
        </div>
        {/* ProfilePhoto */}
        <div className="ml-4">
          {profilePhoto && (
            <div className="flex flex-col">
              <img src={profilePhoto} alt="profilePhoto"
               className="rounded-full mb-2 h-40 w-40" />
              <button onClick={signUserOut} 
              className="bg-richblue-800 mt-3 text-richblue-5 py-2 rounded-2xl hover:bg-richblue-25 hover:border-2 hover:font-bold hover:text-richblue-800 transition-all duration-200">Sign Out</button>
            </div>
          )}
        </div>
      </div>
      {/* Transaction */}
      <div className="flex flex-col items-center justify-center mt-8 bg-richblack-100 w-[50%] mx-auto rounded-xl "> 
        <h2 className="font-bold text-3xl mt-2 mb-1 text-richblue-800">Transactions</h2>
        <ul className="mb-4">
          {transactions.map((transaction, index) => {
            return (
              
              <li key={index} className="flex flex-row justify-between gap-16 items-center ">
                <h4 className="flex flex-col">{transaction.description}
                <p> ${transaction.transactionAmount} {" "}
                   <label className={transaction.transactionType === "expense" ? "text-pink-900" : "text-caribbeangreen-800"}>{transaction.transactionType}</label>{" "}{" "}
               </p>
               </h4>
                {/* <div className="cursor-pointer"
                onClick={deleteExpense(index.id)}>
                <MdOutlineDelete/>
                </div> */
                }
               
              </li>
            
            
              
                    
                
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
