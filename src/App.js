import * as math from 'mathjs';
import {useState } from 'react';
import './App.css';
import Moon from './components/moon';
import { NumpadBoard } from './components/numpad-board';
import Sun from './components/sun';
import { Keys } from './data/keys';

function App() {
  const keys = Keys()
  const [input, setInput] = useState("0");
  const [result, setResult] = useState(0)
  const operator = ['/', '*', '-', '+']
  const [darkTheme, setDarkTheme] = useState(true)

  const switchThemeHandler = () => {
    if (darkTheme) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
  }

  const addToInput = (value) => {
    console.log(`Entry value: ${value}`)
    let newDisplay = input

    // clear all
    if (value === 'AC') { 
      console.log("Clear all")
      setInput('0')
      setResult(0)
    } //delete last
      else if (value === '⌫' && input !== "0") { 
      console.log("Cut last")
      newDisplay = newDisplay.slice(0, -1)
      setInput(newDisplay)

    } // prevent multi operators
      else if (operator.includes(newDisplay.at(-1)) && newDisplay.slice(-1) === "-" && operator.includes(value)) {
      console.warn(`Error TWO operators: ${newDisplay}`)
      newDisplay = input.slice(0, -2) + value
      setInput(newDisplay)
    
    } //2 operators together => delete prev
      else if (value !== "-" && operator.includes(newDisplay.slice(-1)) && operator.includes(value)) { 
      console.warn(`Error two operators: ${newDisplay}`)
      newDisplay = input.slice(0, -1) + value
      setInput(newDisplay)
      
    }  // prevent double "-"
      else if (value === "-" && newDisplay.slice(-1) === "-") {
      setInput(newDisplay)
      console.warn(`Prevent double "-"`)
      
    } // correct decimal separator
      else if (value === "." && input === "0") {
      newDisplay = "0."
      setInput(newDisplay) 
      console.warn(`Set dot correct : ${newDisplay}`)

    } // prevent last operator when solve
      else if (value === "=" && operator.includes(newDisplay.slice(-1))) {
      newDisplay = input.slice(0, -1)
      setInput(newDisplay)
      setResult(`= ${math.evaluate(newDisplay)}`)
      console.log(`Cut last operator and Equals hit and input: ${input} and result: ${result}`)

    } //prevent "=" in input
      else if (value === "=") {
        if (input === '0') {
          return
        } else {
          setResult(`= ${math.evaluate(newDisplay)}`)
          console.log(`Equals hit and input: ${input} and result: ${result}`)
        }
        

    } //prevent operator wiil be first sign
      else if (input === '0' &&  value !== "⌫" && !operator.includes(value)) {
      setInput(value)

    } //adding new sign
      else if (input !== '0') {
      newDisplay += value
        setInput(newDisplay)
        console.log(newDisplay)

    } 
      
  }

  return (
    <div className="App">
     <main>
        <div className={`calculator ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
         
          <div className='display-container'>
              <div 
                className='switcher-theme'
                onClick={() => switchThemeHandler()}
                >
                <div className={`sun ${darkTheme ? '' : 'active'}`}>
                  <Sun />
                </div>
                <div className={`moon ${darkTheme ? 'active' : ''}`}>
                  <Moon />
                </div>            
              </div>
              <div className='display'>
                  <div className='formula-screen'>{input}</div>
                  <div className='output-screen' id='display'>{result}</div>
              </div>

          </div>
          <NumpadBoard keys={keys} addToInput={addToInput} />
        </div>
     </main>
    </div>
  );
}

export default App;
