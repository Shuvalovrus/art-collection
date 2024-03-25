import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { Outlet, RouterProvider } from "react-router-dom"

import "./App.css"
import Header from "./components/Header/Header"

const App = () => {
  return (
    <Layout className="container">
      <Header />
      <Content className="main">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default App
