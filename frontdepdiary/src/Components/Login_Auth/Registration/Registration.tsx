import {useState, ChangeEvent} from "react";
import {RegistrationRequest} from "Interfaces/IAuthRegContext";
import styles from "Components/Login_Auth/Registration/Registration.module.css";
import {ApiClient} from "ApiClient/ApiClient";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export const Registration = () => {
  const apiClient = new ApiClient();
  const navigate = useNavigate();

  let [newuser, setNewUser] = useState<RegistrationRequest>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewUser({
      ...newuser,
      [name]: value,
    });
  };

  const registrationHandler = async () => {
    try {
      let result = apiClient.Registration(newuser);
      console.log(result);
      toast.success("Registration is success");
      navigate("/login");
    } catch (error) {
      toast.error("Current email is not avaible, choose different");
    }
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
            <button
              className={styles.login_button}
              onClick={registrationHandler}
              type="button"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
