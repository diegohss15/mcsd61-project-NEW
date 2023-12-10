import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [role, setRole] = useState('');

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        var userData = {
            name: name,
            bio: bio,
            email: email,
            location: location,
            role: role,
            authId: "",
        }

        if (password === confirmPassword) {
            try {
                var authentication = await createUserWithEmailAndPassword(auth, email, password);
                userData.authId = authentication.user.uid;
                await addDoc(collection(db, 'users'), userData);
                navigate("/Dashboard");
            } catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }     
        } else {
            setNotice("Passwords don't match. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-md-4 mt-3 pt-3 pb-3">
                    {"" !== notice && (
                        <div className="alert alert-warning" role="alert">
                            { notice }    
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input id="signupName" type="text" className="form-control" aria-describedby="nameHelp" placeholder="" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label htmlFor="signupName" className="form-label">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="signupLocation" type="text" className="form-control" aria-describedby="locationHelp" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)}></input>
                        <label htmlFor="signupLocation" className="form-label">Location</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="signupRole" type="text" className="form-control" aria-describedby="roleHelp" placeholder="" value={role} onChange={(e) => setRole(e.target.value)}></input>
                        <label htmlFor="signupRole" className="form-label">Role</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="signupBio" type="text" className="form-control" aria-describedby="bioHelp" placeholder="" value={bio} onChange={(e) => setBio(e.target.value)}></input>
                        <label htmlFor="signupBio" className="form-label">Bio</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input id="signupEmail" type="email" className="form-control" aria-describedby="emailHelp" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <label htmlFor="signupEmail" className="form-label">Enter an email address for your username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="signupPassword" type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary pt-3 pb-3" onClick={(e) => signupWithUsernameAndPassword(e)}>Signup</button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>Go back to login? <Link to="/">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
