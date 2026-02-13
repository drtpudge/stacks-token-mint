import React, { useState } from 'react';
import { connectWallet } from './connect';
import { mintToken } from './contract';

function App() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Stacks Token Mint DApp</h1>
      <button onClick={connectWallet} style={{ margin: "5px" }}>Connect Wallet</button>
      <div style={{ marginTop: "10px" }}>
        <input type="text" placeholder="Recipient" onChange={e => setRecipient(e.target.value)} />
        <input type="number" placeholder="Amount" onChange={e => setAmount(Number(e.target.value))} />
        <button onClick={() => mintToken(recipient, amount)}>Mint Token</button>
      </div>
    </div>
  );
}

export default App;
