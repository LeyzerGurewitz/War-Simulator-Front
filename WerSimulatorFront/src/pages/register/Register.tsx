import React, { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/features/user/userSlice";
import "./register.css";

const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [idfRegion, setIdfRegion] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const fullOrganization =
      organization === "IDF" && idfRegion ? `IDF - ${idfRegion}` : organization;
      
      const result = await dispatch(
          registerUser({ userName, password, organization: fullOrganization })
        );
        console.log(result)

    if (result.type === 'user/registerUser/rejected') {
      alert("הרשמה הצליחה");
      window.location.href = "/login";
    } else {
      alert("הרשמה נכשלה");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      
      <select
        value={organization}
        onChange={(e) => {
          setOrganization(e.target.value);
          setIdfRegion(""); 
        }}
        required
      >
        <option value="">בחר ארגון</option>
        <option value="IDF">IDF</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
        <option value="IRGC">IRGC</option>
        <option value="Houthis">Houthis</option>
      </select>

     
      {organization === "IDF" && (
        <select
          value={idfRegion}
          onChange={(e) => setIdfRegion(e.target.value)}
          required
        >
          <option value="">בחר אזור IDF</option>
          <option value="North">IDF - North</option>
          <option value="South">IDF - South</option>
          <option value="Center">IDF - Center</option>
          <option value="West Bank">IDF - West Bank</option>
        </select>
      )}

      <button type="submit">הרשמה</button>
    </form>
  );
};

export default Register;
