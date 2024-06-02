import { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post(
        `https://env-app-backend.onrender.com/api/users/login`,
        value
      );
      dispatch({ type: "HIDE_LOADING" });
      if (res.data.message === "Login Fail") {
        return message.error("User Not Found");
      } else {
        message.success("User Logged-In Successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //currently login  user
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register">
        <div className="regsiter-form">
          <h1>INV APP</h1>
          <h3>Login Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input required />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input required type="password" />
            </Form.Item>
            {/* <p className="test-creds">UserId: 123 | Password: 123</p> */}
            <Button type="primary" htmlType="submit">
              Login
            </Button>

            <div className="d-flex justify-content-between mt-2">
              <p>
                not a user? Please
                <Link to="/register"> Register Here !</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
