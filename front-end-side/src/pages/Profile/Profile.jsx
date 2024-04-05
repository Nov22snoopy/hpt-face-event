import React from "react";
import "./profilePage.css";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Profile = () => {
  const { user } = useSelector((state) => state.UserService);
  return (
    <div className="profile mt-5">
      <section className="header container">
        <div className="profile-header"></div>
        <div className="row profile-content md:px-2 md:mx-4 mx-2 ">
          <motion.div
            animate={{ y: -100, scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ ease: "easeOut", duration: 0.5}}
            className="profile-info col-sm-12 col-xl-6 mx-auto md:p-2 p-0"
          >
            <div className="profile-icon ">
              <UserOutlined
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "5px solid white",
                }}
              />
            </div>
            <div className="profile-info-content ">
              <table className="table text-center md:text-lg text-sm">
                <thead>
                  <tr>
                    <th>Email Address</th>
                    <th>Full Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user ? user?.email : ""}</td>
                    <td>{user?.fullname}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
