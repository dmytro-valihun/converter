import { useEffect, useState } from 'react';
import './App.css';
import InputAndCurrency from './InputAndCurrency';

function App() {
  const [rates, setRates] = useState([])
  const [amount1, setAmount1] = useState(1)
  const [currency1, setCurrency1] = useState('USD')
  const [amount2, setAmount2] = useState(1)
  const [currency2, setCurrency2] = useState('EUR')

  useEffect(() => {
    fetch('http://data.fixer.io/api/latest?access_key=e9f36b3fe2c32941ba0e4dff148d0c1b')
    .then(res => res.json())
    .then(data => setRates(data.rates))
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmount1(1)
    }
  // eslint-disable-next-line
  }, [rates])

  function formatNum(num) {
    return num.toFixed(3)
  }

  function handleAmount1(amount1) {
    setAmount1(amount1)
    setAmount2(formatNum(amount1 * rates[currency2] / rates[currency1]))
  }
  function handleCurrency1(currency1) {
    setCurrency1(currency1)
    setAmount2(formatNum(amount1 * rates[currency2] / rates[currency1]))
  }
  function handleAmount2(amount2) {
    setAmount2(amount2)
    setAmount1(formatNum(amount2 * rates[currency1] / rates[currency2]))
  }
  function handleCurrency2(currency2) {
    setCurrency2(currency2)
    setAmount1(formatNum(amount2 * rates[currency1] / rates[currency2]))
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <h1>Converter</h1>
        <InputAndCurrency 
          rates={Object.keys(rates)}
          amount={amount1}
          exRate={currency1}
          setAmount={handleAmount1}
          setExRate={handleCurrency1}
        />
        <div className='equal'>=</div>
        <InputAndCurrency 
          rates={Object.keys(rates)}
          amount={amount2}
          exRate={currency2}
          setAmount={handleAmount2}
          setExRate={handleCurrency2}
        />
      </div>
    </div>
  );
}

export default App;



// i used:
// https://fixer.io/quickstart

// can use:
// https://www.exchangerate-api.com/docs/standard-requests
// fetch('https://v6.exchangerate-api.com/v6/61391b5eb34f54b5f7019762/latest/USD')