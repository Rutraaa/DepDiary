import {useState, ChangeEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginRequest} from "Interfaces/IAuthRegContext";
import {ApiClient} from "ApiClient/ApiClient";
import styles from "Components/Login_Auth/Login/LoginPage.module.css";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const apiClient = new ApiClient();
  const navigate = useNavigate();

  let [user, setUser] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      await apiClient.Login(user);
      toast.success("Success log in");
      navigate("/dashboard", {replace: true});
    } catch (error) {
      toast.error("Something went wrong, check you email or password");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.login_container}>
          <form className={styles.login_form}>
            <div className={styles.login_header}>Login</div>
            <input
              className={styles.input_field}
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <input
              className={styles.input_field}
              placeholder="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
            <button
              className={styles.login_button}
              onClick={handleLogin}
              type="button"
            >
              Login
            </button>
            <button className={styles.register_button} type="button">
              <Link className={styles.link} to="/register">
                Don't have an account? Register
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
