import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to Chai Loop</h1>

      <h2>Hello, {loggedInUser?.name}</h2>

      <nav>
        <button onClick={() => navigate("/user")}>Home</button>

        <button onClick={() => navigate("/cart")}>Cart</button>
        <button onClick={() => navigate("/user/orders")}>My Orders</button>

        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div>
        <h2>Welcome Back!</h2>

        <p>You are logged in as {loggedInUser?.email}</p>
      </div>
    </div>
  );
}

export default Home;
