import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/features/user/userSlice";
import { AppDispatch } from "../../store/store";
import "./login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser({ userName, password }));

      if (loginUser.fulfilled.match(result)) {
        console.log("Login successful");
      } else {
        setError("שם המשתמש או הסיסמה לא נכונים");
      }
    } catch (error) {
      setError("שגיאה בהתחברות, נסה שוב");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>login</h1>
      <input
        type="text"
        placeholder="שם משתמש"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "טוען..." : "התחבר"}
      </button>
      {error && <div className="error">{error}</div>} 

      <button
        type="button"
        onClick={() => navigate("/register")} 
        className="register-button" 
      >
        להרשמה
      </button>
    </form>
  );
};

export default Login;
