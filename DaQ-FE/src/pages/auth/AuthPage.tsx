import * as React from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterFrom";
import { useParams } from "react-router-dom";

export default function AuthPage() {
  const [tab, setTab] = React.useState<"login" | "register">("login");
  
  const params = useParams();
  const tableId = params.tableId;
  
  localStorage.setItem("tableId", tableId!);

  return (
    <div>
      {tab === "login" ? (
        <LoginForm onClick={() => setTab("register")} />
      ) : (
        <RegisterForm onClick={() => setTab("login")} />
      )}
    </div>
  );
}
