import React, { useState } from "react";

interface SideMenuProps {
  options: string[];
  onSelectOption: (option: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ options, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(options[0] || null);

  const handleSelectOption = (option: string) => {
    onSelectOption(option);
    setSelectedOption(option);
  };

  return (
    <div className={`w-48 bg-gray-900 p-3 border-t border-right border-gray-400 `}>
      <h2 className="my-2 font-bold text-lg text-gray-300 text-center">Menu</h2>
      <div className="border border-gray-20 w-full inline-block mb-2"></div>
      <ul className="list-none p-0 m-0">
        {options.map((option, index) => (
          <li
            key={option}
            className={`sidemenu-item rounded-lg cursor-pointer py-2 px-2 my-2 text-center transition duration-200 ease-in-out ${
              selectedOption === option
                ? "bg-gray-100 text-gray-900 font-medium"
                : "hover:bg-gray-300 hover:text-gray-900 hover:opacity-80 text-white"
            }`}
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
