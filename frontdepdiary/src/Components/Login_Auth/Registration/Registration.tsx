import { useState, ChangeEvent } from "react";
import RegistrationDto from "Interfaces/Log_Auth/RegistrationDto";
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
      <div className={styles.wrapper}>
        <div className={styles.login_container}>
          <form className={styles.login_form}>
            <div className={styles.login_header}>Registration</div>
            <input
              className={styles.input_field}
              placeholder="Enter you username"
              type="text"
              name="username"
              value={newuser.username}
              onChange={handleInputChange}
            />
            <input
              className={styles.input_field}
              placeholder="Enter you email"
              type="email"
              name="email"
              value={newuser.email}
              onChange={handleInputChange}
            />
            <input
              className={styles.input_field}
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
