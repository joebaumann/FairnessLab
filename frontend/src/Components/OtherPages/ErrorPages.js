import React from "react";
import { useLocation, Link } from "react-router-dom";

export function Error404() {
  let location = useLocation();
  return (
    <div>
      <h1>Resource not found at {location.pathname}</h1>
      <p>
        <Link to="/FairnessLab">Go home</Link>
      </p>
    </div>
  );
}
