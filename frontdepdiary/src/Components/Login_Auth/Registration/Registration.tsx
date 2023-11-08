import { useState, ChangeEvent } from "react";
import { RegistrationDto } from "@Interfaces/IRegistrationDto";
import "Components/Login_Auth/Registration/Registration";

export const Registration = () => {
  let [newuser, setNewUser] = useState<RegistrationDto>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({
      ...newuser,
      [name]: value,
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="login_container">
          <form className="login_form">
            <div className="login_header">Registration</div>
            <input
              className="input_field"
              placeholder="Enter you username"
              type="text"
              name="username"
              value={newuser.username}
              onChange={handleInputChange}
            />
            <input
              className="input_field"
              placeholder="Enter you email"
              type="email"
              name="email"
              value={newuser.email}
              onChange={handleInputChange}
            />
            <input
              className="input_field"
              placeholder="Create new password"
              type="password"
              name="password"
              value={newuser.password}
              onChange={handleInputChange}
            />
            <button className="login_button" type="button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
