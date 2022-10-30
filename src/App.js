import React, { Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import brandLogo from "./brand-logo.svg";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";

const ApprovalDashboard = React.lazy(() =>
  import("./Components/ApprovalDashboard/ApprovalDashboard")
);

const RestaurantOnBoarding = React.lazy(() =>
  import("./Components/RestaurantOnBoarding/RestaurantOnBoarding")
);

const { Header, Content } = Layout;

const App = () => {
  const history = useHistory();

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={brandLogo}
              width={24}
              height={24}
              onClick={() => history.push("/")}
            />
            <span
              style={{
                marginLeft: 8,
                color: "#fff",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              POPULENCER
            </span>
          </div>
          <Button type="primary" icon={<LogoutOutlined />}>
            Logout
          </Button>
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          paddingTop: 16,
          paddingLeft: 120,
          paddingRight: 120,
          paddingBottom: 16,
          marginTop: 64,
        }}
      >
        <div style={{ backgroundColor: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/onBoarding" component={RestaurantOnBoarding} />
            <Route path="/" exact={true} component={ApprovalDashboard} />
          </Switch>
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
};
export default App;
