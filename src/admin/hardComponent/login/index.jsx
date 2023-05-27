import style from "./index.module.css";
// import logo from "../../img/logoLogin.png";
import { useState } from "react";
// import { toast } from "react-toastify";
// import { StatusMobileNav } from "../../App";
// import { useContext } from "react";
import { useSignIn } from "@clerk/clerk-react";
import ReactLoading from "react-loading";
import { BiArrowBack } from "react-icons/bi";




export default function SignIn() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [forGotPass, setForGotPass] = useState(false);



  // console.log(location.hash.substring(16, location.hash.length));
  // console.log(
  //   decodeURIComponent(location.hash.substring(16, location.hash.length))
  // );

  const { isLoaded, signIn, setActive } = useSignIn();

  const forGot = () => {
    setForGotPass(!forGotPass);
    setProgress("");
  };

  // var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  // // console.log(email.match(pattern))

  if (!isLoaded) {
    // handle loading state
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setProgress("");
    setLoading(true);
    if (email === "") {
      setProgress("blankEmail");
      setLoading(false);
    } else if (email.includes("@hpu.edu.vn")) {
      // var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // Check the sign in response to
      // decide what to do next.
      await signIn
        .create({
          identifier: email,
          password,
        })
        .then(async (result) => {
          if (result.status === "complete")
            setActive({ session: result.createdSessionId });
        })
        .catch((err) => {
          if (email === "") setProgress("blankEmail");
          else setProgress(err.errors[0].message);
          setLoading(false);
        });
    } else {
      setProgress("Couldn't find your account.");
      setLoading(false);
    }
  }

  async function submit1(e) {
    e.preventDefault();
    // alert('clicked!')
    // Prepare sign in with strategy and identifier
    setLoading(true);
    // console.log(email)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {forGotPass ? (
        <div className={style.Wrapform}>
          <div>
            <button
              style={{
                padding: "0",
                backgroundColor: "unset",
                border: "none",
                cursor: "pointer",
              }}
              onClick={forGot}
            >
              <BiArrowBack style={{ fontSize: "35px" }} />
            </button>
          </div>
          <h2 style={{ color: "black", textAlign: "center" }}>Quên mật khẩu</h2>
          <form className={style.form} onSubmit={submit1}>
            <div>
              {/* <label>Email</label> */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={style.input}
                placeholder="Email"
              />
              {progress === "Couldn't find your account." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Email không tồn tại trong hệ thống!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {loading ? (
                <ReactLoading
                  type="spin"
                  color="#0083C2"
                  width={"30px"}
                  height={"30px"}
                  className={style.loading}
                />
              ) : progress === "forGotPassSent" ? (
                <p style={{ color: "green", fontSize: "14px" }}>
                  Một đường link đặt lại mật khẩu đã được gửi đến Email!
                </p>
              ) : (
                <button className={style.submit}>Xác nhận</button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className={style.Wrapform}>
          <h2 style={{ color: "black", textAlign: "center" }}>Đăng nhập</h2>
          <form className={style.form} onSubmit={submit}>
            <div>
              {/* <label>Email hoặc mã sinh viên</label> */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={style.input}
                placeholder="Email"
              />
              {progress === "blankEmail" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Vui lòng nhập email !
                </p>
              ) : progress === "Couldn't find your account." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Email không tồn tại!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {/* <label htmlFor="password">Mật khẩu</label> */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={style.input}
                placeholder="Mật khẩu"
              />
              {progress === "Enter password." && email !== "" ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Vui lòng nhập mật khẩu!
                </p>
              ) : progress ===
                "Password is incorrect. Try again, or use another method." ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Mật khẩu không chính xác!
                </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              {loading ? (
                <ReactLoading
                  type="spin"
                  color="#0083C2"
                  width={"30px"}
                  height={"30px"}
                  className={style.loading}
                />
              ) : (
                <button className={style.submit}>Đăng nhập</button>
              )}
            </div>
          </form>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                color: "#069",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={forGot}
            >
              Quên mật khẩu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}