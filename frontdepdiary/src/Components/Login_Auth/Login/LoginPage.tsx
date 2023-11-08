import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import LoginDto from "Interfaces/Log_Auth/LoginDto";
import styles from "Components/Login_Auth/Login/LoginPage.module.css";

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
                        <button className={styles.login_button} type="button">
                            Login
                        </button>
                        <button className={styles.register_button} type="button">
                            <Link className={styles.link} to="/register">
                                Don't have an account? Register
                            </Link>
                        </button>
                    </form>
                </div >
            </div >
        </>
    );
};
