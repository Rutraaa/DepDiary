import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { LoginDto } from "@Interfaces/ILoginDto";

export const LoginPage = () => {
  let [user, setUser] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="wrapper">
      <div className="login_container">
        <form className="login_form">
          <div className="login_header">Login</div>
          <input
            className="input_field"
            placeholder="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            className="input_field"
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <button className="login_button" type="button">
            Login
          </button>
          <button className="register_button" type="button">
            <Link className="link" to="/register">
              Don't have an account? Register
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};
