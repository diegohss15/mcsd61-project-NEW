import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/Dashboard"); // Redirect to the Dashboard on successful login
        } catch {
            setNotice("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-md-4 mt-3 pt-3 pb-3">
                    {"" !== notice && (
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input
                            id="loginEmail"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="loginEmail" className="form-label">
                            Enter your email address
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            id="loginPassword"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <label htmlFor="loginPassword" className="form-label">
                            Password
                        </label>
                    </div>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary pt-3 pb-3"
                            onClick={(e) => loginWithUsernameAndPassword(e)}
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>
                            Don't have an account? <Link to="/signup">Sign up here.</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
