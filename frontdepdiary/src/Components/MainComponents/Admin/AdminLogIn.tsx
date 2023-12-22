import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "Components/MainComponents/Admin/AdminLogIn.module.css";
import toast from "react-hot-toast";

export const AdminLogIn = () => {
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (adminName === "admin" && adminPass === "admin") {
        toast.success("Success log in");
        navigate("/adminDashboard", {replace: true});
      } else {
        toast.error("Wrong password or login");
      }
    } catch (error) {
      toast.error("Something went wrong, check you email or password");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.login_container}>
          <form className={styles.login_form}>
            <div className={styles.login_header}>Admin Login</div>
            <input
              className={styles.input_field}
              placeholder="Admin Name"
              type="text"
              name="adminName"
              onChange={e => setAdminName(e.target.value)}
            />
            <input
              className={styles.input_field}
              placeholder="Password"
              type="password"
              name="password"
              onChange={e => setAdminPass(e.target.value)}
            />
            <button
              className={styles.login_button}
              onClick={handleLogin}
              type="button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
