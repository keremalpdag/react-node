import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword", {currentPassword: currentPassword, newPassword: newPassword}, {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((response) => {
            if(response.data.error) {
                alert(response.data.error);
            }
        });
    }

    return (
        <div>
            <h1>Change Your Password</h1>
            <label>Enter current password: </label><input type="password" placeholder="current password"
                onChange={(event) => { setCurrentPassword(event.target.value) }}></input>
            <label>Enter new password: </label><input type="password" placeholder="new password"
                onChange={(event) => { setNewPassword(event.target.value) }}></input>
            <button onClick={changePassword}>Apply Changes</button>
        </div>
    )
}

export default ChangePassword;