import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../helper/fetch";
import AuthContext from "../../context/auth";
import Toast from "../../component/toast";

import LoginPageCss from "./style.module.css";

export const Signin = () => {
  const [toast, setToast] = useState(null);

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetchAPI("/auth/login", "POST", {
        email,
        password,
      });
      authContext.login(res.data);
      setToast({
        message: "Login Succes",
        severity: "succses",
      });
      if (res.data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setToast({
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const number = formData.get("number");

    try {
      await fetchAPI("/auth/register", "POST", {
        name,
        email,
        password,
        number,
      });
      document
        .querySelector("#container")
        .classList.remove(LoginPageCss["sign-up-mode"]);
    } catch (error) {
      setToast({
        message: error.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      {toast && <Toast {...toast} />}
      <div className={LoginPageCss["container"]} id="container">
        <div className={LoginPageCss["forms-container"]}>
          <div className={LoginPageCss["signin-signup"]}>
            <form
              onSubmit={handleSubmitLogin}
              className={LoginPageCss["sign-in-form"]}
            >
              <h2 className={LoginPageCss["title"]}>Sign in</h2>
              <div className={LoginPageCss["input-field"]}>
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" required name="email" />
              </div>
              <div className={LoginPageCss["input-field"]}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                  min={8}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className={`${LoginPageCss["btn"]} ${LoginPageCss["solid"]}`}
              />
            </form>
            <form
              onSubmit={handleSubmitRegister}
              className={`${LoginPageCss["sign-up-form"]}`}
            >
              <h2 className={LoginPageCss["title"]}>Sign up</h2>
              <div className={LoginPageCss["input-field"]}>
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Name" name="name" required />
              </div>
              <div className={LoginPageCss["input-field"]}>
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" required />
              </div>
              <div className={LoginPageCss["input-field"]}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  min={8}
                  name="password"
                />
              </div>
              <div className={LoginPageCss["input-field"]}>
                <i className="fa fa-address-book"></i>
                <input placeholder="Number" required name="number" />
              </div>
              <input
                type="submit"
                className={LoginPageCss["btn"]}
                value="Sign up"
              />
            </form>
          </div>
        </div>

        <div className={LoginPageCss["panels-container"]}>
          <div
            className={`${LoginPageCss["panel"]} ${LoginPageCss["left-panel"]}`}
          >
            <div className={LoginPageCss["content"]}>
              <h3>Baru Disini?</h3>
              <p>Daftarkan akunmu agar dapat bergabung dengan kami!</p>
              <button
                className={`${LoginPageCss["btn"]} ${LoginPageCss["transparent"]}`}
                id="sign-up-btn"
                onClick={() => {
                  document
                    .querySelector("#container")
                    .classList.add(LoginPageCss["sign-up-mode"]);
                }}
              >
                Sign up
              </button>
            </div>
            <img src="/login.svg" className={LoginPageCss["image"]} alt="" />
          </div>
          <div
            className={`${LoginPageCss["panel"]} ${LoginPageCss["right-panel"]}`}
          >
            <div className={LoginPageCss["content"]}>
              <p>Silahkan daftarkan akunmu dan bergabunglah dengan kami!</p>
              <button
                className={`${LoginPageCss["btn"]} ${LoginPageCss["transparent"]}`}
                id="sign-in-btn"
                onClick={() => {
                  document
                    .querySelector("#container")
                    .classList.remove(LoginPageCss["sign-up-mode"]);
                }}
              >
                Sign in
              </button>
            </div>
            <img src="/reg.svg" className={LoginPageCss["image"]} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
