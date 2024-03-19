// pages/editor/page.tsx

import React from "react";
import { DataTable } from "./components/Table";
const EditorPage: React.FC = () => {
  return (
    <div className="">
      <h1>Editor Page</h1>
      <DataTable />
      {/* Add your editor-related content here */}
    </div>
  );
};

export default EditorPage;
