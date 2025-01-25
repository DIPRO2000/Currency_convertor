import { useState } from "react";
import InputBox from "./InputBox";


const CurrencyBox = () =>{
    const [value1,setvalue1]=useState("");
    const [value2,setvalue2]=useState("");
    

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

    return(
        <>
           <div className="relative p-5 rounded-xl backdrop-blur-sm border-black border-4">
                <InputBox items={"FROM"} currencyvalue={value1} onCurrencyChange={Handlevalue1}/>
                <button type="button" className="p-2 absolute left-1/2 -translate-x-1/2 -translate-y-6.5 border-4 rounded-xl border-white bg-blue-800 text-white cursor-pointer hover:scale-110 hover:bg-orange-600  active:scale-100 active:bg-blue-800" onClick={HandleSwap}>SWAP</button>
                <InputBox items={"TO"} currencyvalue={value2} onCurrencyChange={Handlevalue2}/>
           </div> 
        </>
    )
}

export default CurrencyBox;