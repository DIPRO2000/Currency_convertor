import { useEffect, useState } from "react";
import InputBox from "./InputBox";


const CurrencyBox = () =>{
    const [value1,setvalue1]=useState("");     //FROM CURRENCY UNIT
    const [value2,setvalue2]=useState("");     //TO CURRENCY UNIT 
    const [amount1,setamount1]=useState(0);    //FROM CURRENCY AMOUNT
    const [amount2,setamount2]=useState(0);    //TO CURRENCY AMOUNT 
    const [baseCurrency,setbaseCurrency]=useState("");
    const [currencyRate,setcurrencyRate]=useState(0);

    async function fetchRate(value) {
        const response=await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data=await response.json();
        if(Object.keys(data.rates).includes(value))
        {
            return data.rates[value];
        }
    }

    const Handlevalue1=(currency)=>{
        setvalue1(currency);
    }
    const Handlevalue2=(currency)=>{
        setvalue2(currency);
    }
    const HandleSwap=()=>{
        let copy=value1;
        setvalue1(value2);setvalue2(copy);
    }
    const CurrencyConvertor=()=>{
        if(value1===value2)
        {
            setamount2(amount1);
        }
        else if(value1=="USD")
        {
           let amountRate=fetchRate(value2);
           setamount2(amount1*amountRate); 
        }
        else if(value2=="USD")
        {
            let amountRate=fetchRate(value1);
            setamount2(amount1/amountRate);
        }
    }





    return(
        <>
           <div className="relative p-5 rounded-xl backdrop-blur-sm border-black border-4">
                <InputBox items={"FROM"} currencyvalue={value1} onCurrencyChange={Handlevalue1} baseCurrency={(base)=>setbaseCurrency(base)} inputAmount={(amount)=>setamount1(amount)}/>

                <button type="button" className="p-2 absolute left-1/2 -translate-x-1/2 -translate-y-6.5 border-4 rounded-xl border-white bg-blue-800 text-white cursor-pointer hover:scale-110 hover:bg-orange-600  active:scale-100 active:bg-blue-800" onClick={HandleSwap}>SWAP</button>

                <InputBox items={"TO"} currencyvalue={value2} onCurrencyChange={Handlevalue2} baseCurrency={(base)=>setbaseCurrency(base)} convertedAmount={amount2}/>
           </div> 
        </>
    )
}

export default CurrencyBox;