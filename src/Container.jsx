/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Container = (props) => {
  return (
    <div className=' flex , justify-center items-center h-screen w-screen , bg-sky-900   '>
        <div className=' h-3/4  , w-3/4 , bg-white , rounded-sm shadow-slate-700 shadow-sm  ' >
            
            <div className=' image, flex justify-center w-full  pt-6 '>

            <img src="./images/blockchain.png" alt="Blockchain icon" className=' w-44 h-44  '/>
            </div>

            <div className='pt-6'>
                <p className='  text-5xl  font-600 text-sky-900 '>Contract Balance: {props.contractBal}ETH</p>
            </div>

            <div className='pt-6'>
                <p className=' text-5xl  font-600 text-sky-900 '>Account Balance: {props.signerBal}ETH </p>  
            </div>

            <div className='pt-6'>
                <p className=' text-lg  font-900 text-sky-900 '>Connected Account: {props.AccAddress}  </p>
            </div>
            
            <div className=' flex justify-center w-full'>
                <p className='text-lg text-sky-900 mt-5 mr-2'>ETH Amount:</p> 
                <input type="text" placeholder='0.2' onChange={(val)=>props.SetEthVal(val.target.value)} className=' bg-white w-36 h-7 pl-1 rounded-sm mt-5 border-solid border-2 border-sky-900'/>
            </div>

            <div className='pt-6 flex w-full mt-0 justify-evenly'>
               <button className=' w-32 h-8 border-6 bg-sky-900 rounded-sm text-white hover:bg-sky-500 ml-20' onClick={props.fundFunction}>Deposit</button>
               <button className=' w-32 h-8 border-6 bg-sky-900 rounded-sm text-white hover:bg-sky-500 ' onClick={props.ConnectFun} >Connect Wallet</button>
               <button className=' w-32 h-8 border-6 bg-sky-900 rounded-sm text-white hover:bg-sky-500 mr-20' onClick={props.withdrawFunc} >Withdraw</button>
            </div>

            <div className='mt-8 mb-4'>
               <p className='text-sky-900 text-sm '></p>
            </div>
            {console.log(props.ETHVal)}
        </div>
    </div>
  )
}

export default Container

