import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import Web3 from 'web3';

interface Props{
    winnerDetails:{p:string,q:string};
    addr?:string
}

const ModalApp = ({winnerDetails,addr}:Props) => {
    useEffect(()=>{

        if(addr){
        if(addr == winnerDetails.p){
            if(localStorage.getItem('opened')=== 'undefined'){
            showModal()
            localStorage.setItem('opened','true')
            }
        }
    }
    })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      
      <Modal title="Lottery won" open={isModalOpen} onOk={handleOk} >
       <h2>Congratulations you won the lottery draw</h2>
       <h3>Reward: {Web3.utils.fromWei(winnerDetails.q)} bnb</h3>
      </Modal>
    </>
  );
};

export default ModalApp