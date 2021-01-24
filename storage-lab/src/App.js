import React, { useState } from "react";
import { simpleStorage } from "./abi/abi";
import Web3 from "web3";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xe53C900C1D14b6Dc59851022FCb5514fB82d12Dc";
const storageContract = new web3.eth.Contract(simpleStorage, contractAddress);

function App() {
 const [number, setUint] = useState(0);
 const [getNumber, setGet] = useState("0");

 const numberSet = async (t) => {
   t.preventDefault();
   const accounts = await window.ethereum.enable();
   const account = accounts[0];
   const gas = await storageContract.methods.set(number).estimateGas();
   const post = await storageContract.methods.set(number).send({
     from: account,
     gas,
   });
 };

 const numberGet = async (t) => {
   t.preventDefault();
   const post = await storageContract.methods.get().call();
   setGet(post);
 };

 return (
  <div className="main">
    <div className="card">
      <form className="form" onSubmit={numberSet}>
        <label>
          Set your uint256:
          <input
            className="input"
            type="text"
            name="name"
            onChange={(t) => setUint(t.target.value)}
          />
        </label>
        <button className="button" type="submit" value="Confirm">
          Confirm
        </button>
      </form>
      <br />
      <button className="button" onClick={numberGet} type="button">
        Get your uint256
      </button>
      {getNumber}
    </div>
  </div>
);
}

export default App;
