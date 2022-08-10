import React, {useEffect,useState} from 'react'
import web3 from './web3'
import lottery from './lottery'

const App = () => {
  const [manager,setManager] = useState("")
  const [players,setPlayers] = useState([])
  const [pool,setPool] = useState('')
  const [value,setValue] = useState('')
  const[message,setMessage] = useState('')
  const[winner,setWinner] = useState('')

  useEffect(async () => {
      setManager(await lottery.methods.manager().call())
      setPlayers(await lottery.methods.getPlayers().call())
      setPool(await web3.eth.getBalance(lottery.options.address))
  }, [] )

  const onSubmit = async (e) => {
      e.preventDefault();
      const accounts = await web3.eth.getAccounts();

      setMessage("Waiting on transaction to succeed ...")

      await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether')
      })

      setMessage("You're in!")
      setPool(await web3.eth.getBalance(lottery.options.address))
      setPlayers(await lottery.methods.getPlayers().call())
    }

  const pickWinner = async () => {
      const accounts = await web3.eth.getAccounts()
      setWinner('Currently rolling the dice')
      await lottery.methods.pickWinner().send({
        from: accounts[0]
      })

      setWinner('Winner has been picked')
      setPool(await web3.eth.getBalance(lottery.options.address))
      setPlayers(await lottery.methods.getPlayers().call())
  }

  return (
    <div> 
      <div className = "center">
      <h1>Lotto</h1>
      <p>The manager of the contract is {manager}</p>
      <p>There are currently {players.length} people entered</p>
      <p>The pool is currently {web3.utils.fromWei(pool, 'ether')}</p>
      <hr/>
      <form onSubmit = {e => onSubmit(e)}>
        <h4>Want to give it a go?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <br/>
          <input 
            value = {value}
            onChange = {e => setValue(e.target.value)}/>
        </div>
        <button>
          Enter
        </button>
      </form>
      <hr/>
      {message}
      <hr/>
        <h4>Pick a winner</h4>
        <button onClick={e => pickWinner(e)}>
          Enter
        </button>
        <hr/>
      {winner}
      <hr/>
      </div>
      
    </div>
  )
}


export default App