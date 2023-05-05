import {
  connectWalletFE,
  fecthPrizePot,
  fetchOwner,
  fetchWinnerAndAmount,
  totalPlayers,
  totalTicketsBought,
} from "@/src/BE/wallet/web3Functions";
import About from "@/src/FE/components/About";
import Home from "@/src/FE/components/Home";
import HowToPlay from "@/src/FE/components/HowToPlay";
import Stats from "@/src/FE/components/Stats";
import Layout from "@/src/FE/components/layouts/Layout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

export interface Props {
  prizePot?: number;
  ticketCount?: number;
  playersCount?: number;
  apikey?: string;
  owner?: string;
  winnerDetails?: { p: string; q: string };
  timeLeft?:number;
  timerapi?:string
}
declare global{
  interface Window{
    ethereum:any
  }
}
 
function Index({
  prizePot,
  ticketCount,
  playersCount,
  apikey,
  owner,
  winnerDetails,
  timeLeft,
  timerapi
}: Props) {
  const router = useRouter();
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const init = async () => {
      setAddress(await connectWalletFE());
      window.ethereum.on("accountsChanged", () => {
        router.reload();
      });
      window.ethereum.on("chainChanged", () => {
        router.reload();
      });
    };
    init();
  }, [address]);
  return (
    <Layout apikey={apikey} winnerDetails={winnerDetails} address={address}>
      <div>
        <Home timerapi={timerapi} timeLeft={timeLeft} owner={owner} addr={address} />
        <HowToPlay address={address} />
        <Stats
          prizePot={prizePot}
          ticketCount={ticketCount}
          playersCount={playersCount}
        />
        <About />
      </div>
    </Layout>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  let prizePot = await fecthPrizePot();
  let ticketCount = await totalTicketsBought();
  let playersCount = await totalPlayers();
  let apikey = process.env.MORALISAPI;
  let owner = await fetchOwner();
  const timerapi =process.env.TIMERAPI!
  let winnerDetails = await fetchWinnerAndAmount();
  const res = await fetch(timerapi,{
    mode:'no-cors'
  })
  let time= (await res.json())
  let timeLeft
  if(time.errorMessage === "timer timed out"){
     timeLeft=0
  }else{
  timeLeft=(time.start_seconds - time.seconds_elapsed)
  }

  return {
    props: {
      prizePot,
      ticketCount,
      playersCount,
      apikey,
      owner,
      winnerDetails,
      timeLeft,
      timerapi
      
    },
    revalidate: 20,
  };
};

