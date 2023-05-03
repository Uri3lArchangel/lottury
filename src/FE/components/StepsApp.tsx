import React, { CSSProperties } from "react";
import { Button, Steps } from "antd";
import htp from '../../../styles/htp.module.css'

const titleStyles: CSSProperties = {
  fontSize: "1.1rem",
  color: "white",
};

const description = "This is a description.";
const StepsApp: React.FC = () => (
  <Steps
    direction="vertical"
    current={1}
    className={htp.steps}
    items={[
      {
        title: <h3 style={titleStyles}>Get metamask wallet</h3>,
        status: "process",
        description: <Step1 />,
      },
      {
        title: <h3 style={titleStyles}>Connect wallet to dapp</h3>,
        status: "process",
        description:<Step2 />,
      },
      {
        title: <h3 style={titleStyles}>Fund wallet with atleast $5.50 of $bnb</h3>,
        status: "process",
        
      },
      {
        title: <h3 style={titleStyles}>Purchase tickets to win</h3>,
        status: "process",
        description:<Step4 />,
      },
    ]}
  />
);

export default StepsApp;

function Step1() {
  return (
    <div >
      <Button>Get Metamask</Button>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <Button>Connect Wallet </Button>
    </div>
  );
}

function Step4() {
  return (
    <div>
      <Button>Play</Button>
    </div>
  );
}