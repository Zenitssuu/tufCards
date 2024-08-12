import { useState } from "react";
import { Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
