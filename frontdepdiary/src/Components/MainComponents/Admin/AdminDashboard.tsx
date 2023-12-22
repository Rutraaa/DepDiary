import React, {useState, useEffect} from "react";
import styles from "./AdminDashboard.module.css";
import {ApiClient} from "ApiClient/ApiClient";
import {UsersCom} from "./UsersCom";

export interface User {
  userId: number;
  username: string;
}

export const AdminDashboard: React.FC = () => {
  const apiClient = new ApiClient();

  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let result = await apiClient.getDataList<User[]>("/User/list");
    if (result.payload) {
      setUsers(result.payload);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.adminModal}>
          <h1 style={{color: "white"}}>Admin panel</h1>
          <div className={styles.panel}>
            <div className={styles.buttons}>
              <button className={styles.addUserButton}>Add a new user</button>
            </div>
            {users?.map(user => (
              <>
                <UsersCom key={user.userId} user={user} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
