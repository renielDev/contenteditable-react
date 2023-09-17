import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContentEditable from './components/ContentEditable'

function App() {
  const [count, setCount] = useState(0)
  const inputRef = useRef('Sample')

  const onChange = (_event: React.SyntheticEvent) => {
    const evt = _event.target as HTMLInputElement
    console.log(evt)
    inputRef.current = evt?.value
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input onChange={onChange}></input>
      <ContentEditable html={inputRef.current} onChange={onChange} className="content-editable" />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
