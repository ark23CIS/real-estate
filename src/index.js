import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AppContainer } from "react-hot-loader"

function render(Component) {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  )
}
render(App)

if (module && module.hot) {
  module.hot.accept("./App.js", () => {
    const NewApp = require("./App.js").default
    render(NewApp)
  })
}