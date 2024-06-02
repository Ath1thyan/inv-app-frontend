/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  ProductOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Typography } from "antd";
import Spinner from "./Spinner";
const { Text } = Typography;

// ====================================================================

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();

  const { cartItems, loading } = useSelector((state) => state.rootReducer);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // to set localstorage data

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout style={{ height: "100vh" }}>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ color: "#fff" }}>
          <h1 style={{ padding: "5px 0 0 10px" }}>Inv App</h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </Menu.Item>

          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills" className="text-decoration-none">
              Bills
            </Link>
          </Menu.Item>

          <Menu.Item key="/products" icon={<ProductOutlined />}>
            <Link to="/products" className="text-decoration-none">
              Products
            </Link>
          </Menu.Item>

          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers" className="text-decoration-none">
              Customers
            </Link>
          </Menu.Item>

          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart" className="text-decoration-none">
              Cart
            </Link>
          </Menu.Item>

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            <Link to="/logout" className="text-decoration-none">
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            margin: "0 16px",
            padding: 0,
            background: colorBgContainer,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "25px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="cart" onClick={() => navigate("/cart")}>
            <Text
              style={{
                background: "#fff",
                padding: "2px 6px",
                borderRadius: "50%",
              }}
            >
              {cartItems.length}
            </Text>
            <ShoppingCartOutlined />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
