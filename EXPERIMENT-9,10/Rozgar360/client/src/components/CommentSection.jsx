import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useAuth } from "@clerk/clerk-react";

const CommentSection = ({ jobId, existingComment = "" }) => {
  const [comment, setComment] = useState(existingComment || "");
  const [isSaving, setIsSaving] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();

  const handleSaveComment = async () => {
    try {
      setIsSaving(true);
      const token = await getToken();
      await axios.post(
        `${backendUrl}/api/applications/${jobId}/comment`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Comment saved!");
    } catch (err) {
      toast.error("Failed to save comment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-2">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
        placeholder="Add your notes or follow-up details..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      ></textarea>
      <button
        onClick={handleSaveComment}
        disabled={isSaving}
        className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Comment"}
      </button>
    </div>
  );
};

export default CommentSection;
