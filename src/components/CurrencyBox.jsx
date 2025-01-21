import { useEffect, useState } from "react";
import InputBox from "./InputBox";

const CurrencyBox = () => {
  const [value1, setvalue1] = useState("USD"); // FROM CURRENCY UNIT
  const [value2, setvalue2] = useState("USD"); // TO CURRENCY UNIT
  const [amount1, setamount1] = useState(0); // FROM CURRENCY AMOUNT
  const [amount2, setamount2] = useState(0); // TO CURRENCY AMOUNT
  const [baseCurrency, setbaseCurrency] = useState("");
  const [rates, setRates] = useState({}); // Cached rates

  const fetchCurrencyRates = async () => {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    setRates(data.rates); // Cache rates in state
    setbaseCurrency(data.base);
  };

  const CurrencyConvertor = async () => {
    if (value1 === value2) {
      setamount2(amount1 || 0);
    } 
    else if (value1 === baseCurrency) {
      const amountRate = rates[value2] || 0;
      setamount2((amount1 || 0) * amountRate);
    } 
    else if (value2 === baseCurrency) {
      const amountRate = rates[value1] || 0;
      setamount2((amount1 || 0) / amountRate);
    }
    else
    {
        const amountRate1=rates[value1];
        const amountRate2=rates[value2];
        setamount2(((amount1 || 0)/amountRate1)*amountRate2);
    }
  };

  const HandleSwap = () => {
    const copy = value1;
    setvalue1(value2);
    setvalue2(copy);
    CurrencyConvertor(); // Trigger conversion after swapping
  };

  useEffect(() => {
    fetchCurrencyRates(); // Fetch rates once
  }, []);

  useEffect(() => {
    if (Object.keys(rates).length > 0)              // Ensure rates are loaded
    { 
        CurrencyConvertor();
    }
  }, [amount1, value1, value2]);

  return (
    <div className="relative p-5 rounded-xl backdrop-blur-sm border-black border-4">
      <InputBox
        items={"FROM"}
        currencyvalue={value1}
        onCurrencyChange={setvalue1}
        baseCurrency={setbaseCurrency}
        inputAmount={(amount) => setamount1(parseFloat(amount) || 0)}
      />

      <button
        type="button"
        className="p-2 absolute left-1/2 -translate-x-1/2 -translate-y-6.5 border-4 rounded-xl border-white bg-blue-800 text-white cursor-pointer hover:scale-110 hover:bg-orange-600 active:scale-100 active:bg-blue-800"
        onClick={HandleSwap}
      >
        SWAP
      </button>

      <InputBox
        items={"TO"}
        currencyvalue={value2}
        onCurrencyChange={setvalue2}
        baseCurrency={setbaseCurrency}
        convertedAmount={amount2}
      />
    </div>
  );
};

export default CurrencyBox;
