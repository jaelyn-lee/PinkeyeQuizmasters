import Quiz from './Quiz'
import { useRef } from 'react'

function App() {
  return (
    <>
      <h1 className="header">True &nbsp; or &nbsp; False</h1>
      <div className=" pt-20">
        <Quiz />
      </div>
    </>
  )
}

export default App
