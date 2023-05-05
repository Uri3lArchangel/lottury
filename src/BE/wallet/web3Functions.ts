import Web3 from "web3";
import Meta from "../contract/artifacts/lottury.json";
import axios from "axios";
// const
const main = process.env.BSCAPI!;
const test = process.env.BSCAPITEST!;
let web3: Web3=new Web3(Web3.givenProvider || main);

const wrongChain=async()=>{
     if(await web3.eth.getChainId() != 56){
          alert("You are on the wrong network, please switch to BSC")
          return
     }
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
  } catch (error: any) {
    console.log(error.message);
  }
};
export const totalTicketsBought = async () => {
  try {

    const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
    let p = await c.methods.ticketCount().call();
    return p;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const totalPlayers = async () => {
  try {

    const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
    let p = await c.methods.playersCount().call();
    return p;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getMyTickets = async (addr: string | undefined) => {
  try {
    if (addr) {
     
      await wrongChain()

      const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
      let p = await c.methods.ticketsCountPerAddress(addr).call();
      return p;
    }else{
     await connectWalletFE();

    }
  } catch (error: any) {
     console.log(error.message);
   }
};
export const buyTickets = async (addr: string | undefined,count: number,pricePerTIcket:string) => {
  try {
    if (addr) {
      await wrongChain()

      const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
      let p = await c.methods.buyTickets(count,Web3.utils.toWei(pricePerTIcket)).send({from:addr,value:`${((count * parseFloat(Web3.utils.toWei(pricePerTIcket))))}`});
      return p;
    }else{
     await connectWalletFE();

    }
  } catch (error: any) {
     console.log(error.message);
   }
};


export const fetchOwner = async () => {
     try {
            const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
            let p = await c.methods.owner().call();
            return p;
        } catch (error: any) {
          console.log(error.message);
        }
   };
   export const draw = async (addr:string | undefined) => {
     try {   
          if(addr){
         await wrongChain()

        let random= await axios.get("https://www.randomnumberapi.com/api/v1.0/random?min=100000000000000&max=1000000000000000&count=1")
        console.log(random.data[0])
         const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
         let p = await c.methods.draw(random.data[0]).send({from:addr});
         return p;
          }else{
               await connectWalletFE();

          }
       
     } catch (error: any) {
          console.log(error.message);
        }
   };
   
   export const fetchWinnerAndAmount = async () => {
     try {
   
       const c = new web3.eth.Contract(Meta.output.abi, Meta.address);
       let p = await c.methods.winnerAddress().call();
       let q = await c.methods.winningAmount().call();
       return {p,q};
     } catch (error: any) {
       console.log(error.message);
     }
   };