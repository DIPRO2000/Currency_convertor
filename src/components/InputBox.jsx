import React from "react";
import { useState,useEffect } from "react";

const InputBox=(props)=>{
    const [CurrencyList,setCurrencyList]=useState([]);  //store currency units list
    const [CurrencyUnit,setCurrencyUnit]=useState("");  //store selected currency unit 
    const [CurrencyAmount,setCurrencyAmount]=useState(0); //store currency amount
    const [isEditable,setisEditable]=useState(false);

    async function fetchCurrency () {
        try{
            const response=await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data=await response.json();
            setCurrencyList(Object.keys(data.rates));
            props.baseCurrency(data.base);
        }
        catch(error)
        {
            console.log("THE ERROR WHILE FETCH CURRENCY API IS:",error);
        }
    }

    useEffect(()=>{
        if (props.items=="FROM") {
            setisEditable(true);
        }
    });

    useEffect(()=>{
        fetchCurrency();
    },[CurrencyList]);

    useEffect(()=>{
        setCurrencyUnit(props.currencyvalue)
    },[props.currencyvalue]);


    return(
        <>
            <div className="p-5 m-3 flex flex-wrap rounded-xl bg-white ">
                <div className="flex flex-col pr-35">
                    <label className="mb-3.5  text-gray-400">{props.items}:</label>
                    <input type="number" min="0" className="border-1 rounded-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black h-10" onChange={isEditable?(event)=> props.inputAmount(event.target.value):undefined} readOnly={!isEditable} value={props.convertedAmount}/>
                </div>
                <div className="flex flex-col">
                    <label className="mb-3.5  text-gray-400">CURRENCY TYPE</label>
                    <select className="border p-2 rounded w-full cursor-pointer" value={CurrencyUnit}   onChange={(event) => {setCurrencyUnit(event.target.value);          props.onCurrencyChange(event.target.value)}}>
                        <option value="">-- Select Currency --</option>
                        {CurrencyList.map((currency) => (
                        <option key={currency} value={currency}>
                        {currency}
                        </option>
                        ))}
                    </select>
                </div>
            </div>    
        </>
    )
}

export default InputBox;