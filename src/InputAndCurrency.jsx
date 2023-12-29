import React from 'react';

export default function InputAndCurrency(props) {
  const option = props.rates
  return (
    <div className='block'>

      <input 
        type="number" 
        min={0}      
        value={props.amount} 
        onChange={(e) => props.setAmount(+e.target.value)}
      />

      <div className='select-wrapper'>
        <select value={props.exRate} 
          onChange={(e) => props.setExRate(e.target.value) }>
          {option.map(opt => {
            return <option key={opt} value={opt}>{opt}</option>
          })}
        </select>
      </div>
    </div>
  )
}