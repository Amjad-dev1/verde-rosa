import React from "react";
import "../styles/loginregister.css";
export default function Login(){
    return(
        <>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <div className="wrapper glass">
                <div className="close glass">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
                </div>

                <form>
                <h1>Login</h1>

                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <i className='bx bxs-lock'></i>
                </div>

                <div className="remember-forgot">
                    <label>
                    <input type="checkbox" />
                    Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p>
                    Don't have an account? <a href="#">Register</a>
                    </p>
                </div>
                </form>

                <div className="corner-line"></div>
            </div>
        </>
    );
}