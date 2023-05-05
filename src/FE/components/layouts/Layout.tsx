import React, { CSSProperties, useEffect, useRef, useState } from "react";
import layout from "../../../../styles/layouts/fullLayout/layout.module.css";
import { IoHome } from "react-icons/io5";
import { GiHelp } from "react-icons/gi";
import { CgDatabase } from "react-icons/cg";
import Image from "next/image";
import { Button } from "antd";
import logo from "../../../../public/lotterylogo.png";
import CarouselApp from "../CarouselApp";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { useRouter } from "next/router";
import { buyTickets, connectWalletFE, getMyTickets } from "@/src/BE/wallet/web3Functions";
import { fetchPrice } from "@/src/BE/moralis/fetchPrice";
import ModalApp from "../modal";

interface LayoutProps {
  children: React.ReactNode;
  address?:string;
  apikey?:string;
  winnerDetails?:{p:string,q:string}
}

const styleAddr:CSSProperties={   
display:'flex',
alignItems:'center',
height:'100%',
color:'white'
}

function Layout({ children,address,apikey,winnerDetails }: LayoutProps) {
  // let price:any;
  const [price,setPrice] = useState<number>()
  const router = useRouter()
  const ticketRef = useRef<HTMLInputElement>(null)
const [playerTicketCount,setPlayerTicketCount] = useState<number>(0)
const [ticketAmount,setTicketAmount] = useState<number>()

const fetch = async () => {
  if(ticketRef.current){
    if(parseFloat(ticketRef.current.value ) > (6 - playerTicketCount)){
      ticketRef.current.value = `${6-playerTicketCount}`
    }
  setTicketAmount(parseFloat(ticketRef.current.value))
  setPrice(await fetchPrice(apikey!))
  }
}

  useEffect(()=>{
    const init = async()=>{
      setPlayerTicketCount((await getMyTickets(address)))
    }
    init()
  },[playerTicketCount,address,price])
  
  function onClickScroll(e:React.MouseEvent<HTMLAnchorElement>){
    e.preventDefault()
  let id =(e.currentTarget.href.split('#')[1])
    let loc = (document.getElementById(id) as HTMLDivElement)
    loc.scrollIntoView({behavior:'smooth'});
    let links = (document.querySelectorAll("#navlink"))
    for(let i=0;i<links.length;i++){
      links[i].classList.remove('active')
    }
    e.currentTarget.classList.add('active')
  }
  const buy = async()=>{
   try{ 
    let ticketCount = ticketRef.current?.value
    if(ticketCount && price){
    let a =await buyTickets(address,parseInt(ticketCount),`${(parseFloat(((5/price).toFixed(6))))}`)
    router.reload()

    }
  
  }catch(err){
      console.error(err)
    }
  }

  
  return (
    <article className={layout.Page}>
      <header className={layout.Header}>
        <figure>
          <Image src={logo} alt="lottury logo" />
        </figure>
        <div style={styleAddr}>
       {address?<h1 >{address}</h1>:<button onClick={connectWalletFE}>Connect Wallet</button>}
       </div>
      </header>
      <aside className={layout.sideNav}>
        <ul>
          <li >
            <Link id="navlink"  onClick={onClickScroll} href={"#home"}>
              <IoHome size={25} />
            </Link>
            <p>Home</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#howtoplay"}>
              <GiHelp size={25} />
            </Link>
            <p>How To Play</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#stats"}>
              <BsGraphUpArrow size={25} />
            </Link>
            <p>Lottery Stats</p>
          </li>
          <li>
            <Link id="navlink" onClick={onClickScroll} href={"#about"}>
              <CgDatabase size={25} />
            </Link>
            <p>About</p>
          </li>
        </ul>
      </aside>
      <CarouselApp />
      <main>
        <section className={layout.Other}>{children}</section>
        <ModalApp addr={address} winnerDetails={winnerDetails!} />
        <section className={layout.Play}>
        <h5>Tickets owned : {playerTicketCount}</h5>

          <div>
            <aside>5$ / ticket</aside>
            <aside>6 tickets max per player</aside>
            <input onChange={fetch} id="play" min={1} max={6-playerTicketCount} type="number" ref={ticketRef} placeholder="Input ticket amounts" />
            {price && ticketAmount?<p>total cost = {(ticketAmount * 5/price).toFixed(4)}</p>:<p></p>}
            <button onClick={buy}>Buy</button>
          </div>
        </section>
      </main>
      <footer className={layout.Footer}></footer>
    </article>
  );
}

export default Layout;
