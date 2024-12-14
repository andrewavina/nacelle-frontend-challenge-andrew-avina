import React, { useState } from "react";
import NotificationList from "./components/NotificationList/NotificationList";
import Search from "./components/Search/Search";
import "./App.css";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"notifications" | "Search">(
    "notifications"
  );

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
        Frontend Engineering Challenge - Andrew Avina
      </h1>

      <nav className="navigation" aria-label="Main Navigation">
        <button
          className={currentView === "notifications" ? "active" : ""}
          onClick={() => setCurrentView("notifications")}
          aria-pressed={currentView === "notifications"}
        >
          Redux Notifications
        </button>
        <button
          className={currentView === "Search" ? "active" : ""}
          onClick={() => setCurrentView("Search")}
          aria-pressed={currentView === "Search"}
        >
          Search
        </button>
      </nav>

      <div className="content">
        {currentView === "notifications" && <NotificationList />}
        {currentView === "Search" && (
          <Search
            onSearch={handleSearch}
            placeholder="Search for tutorials..."
          />
        )}
      </div>
    </div>
  );
};

export default App;
