import React, { useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { auth, provider } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => {
      alert(e.message);
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((e) => alert(e.message));
  };

  const registerSignIn = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
        }
      })
      .catch((e) => alert(e.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <h3>Exhibitors Corner</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleSignIn}>Login</button>
            </div>
            <button onClick={registerSignIn}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Exhibitors Corner Inc. 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
