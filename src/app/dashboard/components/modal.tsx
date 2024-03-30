import * as React from "react";
import { Button } from "@/components/ui/button";

export const ShareModal: React.FC<{ fileId: string; filename: string; onClose: () => void; }> = ({ fileId, filename, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10">
        <div className="text-lg font-bold mb-2">File Details</div>
        <div className="mb-2"><strong>File ID:</strong> {fileId}</div>
        <div><strong>Filename:</strong> {filename}</div>
        <div className="mt-4 text-right">
          <Button variant="outline" className="text-red-500" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
