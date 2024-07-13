import { useState,useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import chai from "./chai.png";
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0x78375Fd60F976DDB165Aa436E57f9006DAA79997";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
       try{
        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
       
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
         })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer =  provider.getSigner();


        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
        setState({provider,signer,contract});
      }
      catch(error)
      {
        alert(error)
      }
    }
    template();
  },[])   
 return (
  <div >
  <img src={chai} className="img-fluid" alt=".." width="100%" />
  <p style={{ marginTop: "10px", marginLeft: "5px" }}>
    <small>Connected Account - {account}</small>
  </p>
 
    <Buy state={state} />
    <Memos state={state} />
 
</div>
   
    
  )
}

export default App
