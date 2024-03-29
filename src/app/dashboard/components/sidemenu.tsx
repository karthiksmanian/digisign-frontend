import React from "react";

interface SideMenuProps {
  onSelectOption: (option: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onSelectOption }) => {
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        borderRight: "1px solid #ddd",
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Menu</h2>{" "}
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        <li
          className="sidemenu-item"
          onClick={() => onSelectOption("Added Documents")}
          style={{
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid #eee",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Added Documents
        </li>
        <li
          className="sidemenu-item"
          onClick={() => onSelectOption("Documents to be signed")}
          style={{
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid #eee",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Documents to be signed
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
