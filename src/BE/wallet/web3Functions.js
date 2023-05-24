import Web3 from "web3";
import Meta from "../contract/artifacts/lottury.json";
import axios from "axios";
// const
const main = "https://bsc-dataseed1.binance.org/";
const test = process.env.BSCAPITEST;
let web3=new Web3(Web3.givenProvider || main);

const wrongChain=async()=>{
     if(await web3.eth.getChainId() != 56){
          alert("You are on the wrong network, please switch to BSC")
          return false
     }
     return true
}
export const connectWalletFE = async () => {
  try {
     await wrongChain()
   const acc= await web3.eth.requestAccounts();
   
    return acc[0];
  } catch (error) {}
};


export const fecthPrizePot = async () => {
  try {
     
    const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
    let p = await c.methods.prizePot().call();
    return p;
  } catch (error) {
    console.log(error.message);
  }
};
export const totalTicketsBought = async () => {
  try {

    const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
    let p = await c.methods.ticketCount().call();
    return p;
  } catch (error) {
    console.log(error.message);
  }
};

export const totalPlayers = async () => {
  try {

    const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
    let p = await c.methods.playersCount().call();
    return p;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyTickets = async (addr) => {
  try {
    if (addr) {
     
      await wrongChain()

      const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
      let p = await c.methods.ticketsCountPerAddress(addr).call();
      return p;
    }else{
     await connectWalletFE();

    }
  } catch (error) {
     console.log(error.message);
   }
};
export const buyTickets = async (addr,count,pricePerTIcket) => {
  try {
    if (addr) {
      await wrongChain()

      const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
      let p = await c.methods.buyTickets(count,Web3.utils.toWei(pricePerTIcket)).send({from:addr,value:`${((count * parseFloat(Web3.utils.toWei(pricePerTIcket))))}`});
      return p;
    }else{
     await connectWalletFE();

    }
  } catch (error) {
     console.log(error.message);
   }
};


export const fetchOwner = async () => {
     try {
            const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
            let p = await c.methods.owner().call();
            return p;
        } catch (error) {
          console.log(error.message);
        }
   };
   export const draw = async (addr,key) => {
     try {   
          if(addr){
        if( await wrongChain()){
          const data={
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "params": {
                "apiKey": key,
                "n": 1,
                "min": 1,
                "max": 2000000000,
                "replacement": true
            },
            "id": 42
        }
        let random= await axios.post("https://api.random.org/json-rpc/4/invoke",data)
        console.log(random.result.data[0])
         const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
         let p = await c.methods.draw(random.result.data[0]).send({from:addr});
         return p;
          }else{
               await connectWalletFE();

          }
        }
       
     } catch (error) {
          console.log(error.message);
        }
   };
   
   export const fetchWinnerAndAmount = async () => {
     try {
   
       const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
       let p = await c.methods.winnerAddress().call();
       let q = await c.methods.winningAmount().call();
       return {p,q};
     } catch (error) {
       console.log(error.message);
     }
   };