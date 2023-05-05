import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Steps } from "antd";
import htp from "../../../styles/htp.module.css";
import Web3 from "web3";
import { connectWalletFE } from "@/src/BE/wallet/web3Functions";

const titleStyles: CSSProperties = {
  fontSize: "1.1rem",
  color: "white",
};

const description = "This is a description.";
const StepsApp = ({address}:props) => {
  const [status2,setStatus2]=useState<"wait" | "process" | "finish" | "error" | undefined>("process")
  const [status3,setStatus3]=useState<"wait" | "process" | "finish" | "error" | undefined>("process")
  const [status1,setStatus1]=useState<"wait" | "process" | "finish" | "error" | undefined>("process")

  function playgame(){
  setStatus2('finish')
  setStatus3('finish');
    (document.getElementById('play') as HTMLInputElement).tabIndex =0
    console.log(status2)

  }
  useEffect(()=>{
    if(window.ethereum){
      setStatus1("finish")
    }else{
      setStatus1("process")
    }
  },[status1,status2,status3])
  return (
    <Steps
      direction="vertical"
      current={1}
      className={htp.steps}
      items={[
        {
          title: <h3 style={titleStyles}>Get metamask wallet</h3>,
          status: status1,
          description: <Step1  status1={status1} />,
        },
        {
          title: <h3 style={titleStyles}>Connect wallet to dapp</h3>,
          status: address? "finish":"process",
          description: <Step2 address={address} />,
        },
        {
          title: (
            <h3 style={titleStyles}>Fund wallet with atleast $5.50 of $bnb</h3>
          ),
          status: status2,
        },
        {
          title: <h3 style={titleStyles}>Purchase tickets to win</h3>,
          status: status3,
          description: <Step4 play={playgame} />,
        },
      ]}
    />
  );
};

export default StepsApp;

function Step1({status1}:props) {
  return (
    <div>
      {status1 === "finish"?<></>:<Button>Get Metamask</Button>}
    </div>
  );
}
interface props{
  address?:string | undefined;
  play?:React.MouseEventHandler
  status1?:"wait" | "process" | "finish" | "error" | undefined
}
function Step2({address}:props) {
  return (
    <div>
     {address? <></>:<Button onClick={connectWalletFE}>Connect Wallet </Button>}
    </div>
  );
}

function Step4({play}:props) {
  return (
    <div>
      <Button onClick={play}>Play</Button>
    </div>
  );
}
