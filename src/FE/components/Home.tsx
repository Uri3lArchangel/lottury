import React, { useEffect, useReducer, useState } from 'react'
import home from '../../../styles/home.module.css'
import {HiChevronDoubleDown} from 'react-icons/hi2'
import Link from 'next/link'
import { draw } from '@/src/BE/wallet/web3Functions'
import { useRouter } from 'next/router'
interface homeProps{
  addr:string | undefined
  owner:string | undefined
  timeLeft?:number;
  timerapi?:string
}


function Home({addr,owner,timeLeft,timerapi}:homeProps) {
  const router = useRouter()
  function formatTime(seconds:number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  
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


  const drawFunction = async ()=>{
    try {
      await draw(addr)
      localStorage.setItem('opened','undefined')
      await fetch((timerapi!+"86400"),{mode:'no-cors'})
      router.reload()
    } catch (error) {
      
    }
  }
  const [countDown,setCountdown] = useState<number>(timeLeft!)
  const [time,setTime] = useState<string>()
  useEffect(()=>{
    if(timeLeft! <= 0){
      setTime("0")
      return
    }
   const int = setInterval(()=>{
    if(countDown <= 0){
      clearInterval(int)
      setTime("0")
      return
    }
    setCountdown((prev)=>{return prev=prev - 1})
    setTime(formatTime(countDown!))
  },1000)
  
    
return()=>{
  clearInterval(int)
}
  },[countDown,time])
  return (
    <article className={home.Home} id='home'>
        <h1>
           The Blockchain Lottery System
        </h1>
        {addr == owner?<button onClick={drawFunction} style={{width:"40%",height:'60px',cursor:'pointer'}}>Draw</button>:<></>}
        <p>buy, play, win big</p>
        <h2>Time Left: {time}</h2>
        <Link href={'#howtoplay'} onClick={onClickScroll}> <h4> Learn how to play <HiChevronDoubleDown  size={27}/></h4></Link>
    </article>
  )
}

export default Home