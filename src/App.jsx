import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      <h1>
        hello React and Webpack haha
      </h1>
    </div>
  )
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('app')
)