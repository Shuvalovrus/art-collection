import { Button, Space } from "antd"

import logo from "../../assets/logo.svg"
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <div className="header__buttons">
        <Space>
          <Button type="default">Sign in</Button>
          <Button type="default">Sign up</Button>
        </Space>
      </div>
    </header>
  )
}

export default Header
