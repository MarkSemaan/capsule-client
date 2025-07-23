import { useState } from "react";

interface CapsuleData {
  message: string;
  dateTime: string;
  privacy: string;
  tags: string[];
  surpriseMode: boolean;
  mediaType?: "audio" | "image";
}

export const useCapsuleForm = () => {
  const [formData, setFormData] = useState({
    message: "",
    dateTime: "",
    privacy: "Private",
    tags: [] as string[],
    surpriseMode: false,
    mediaType: undefined as "audio" | "image" | undefined,
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (
    field: keyof CapsuleData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const resetForm = () => {
    setFormData({
      message: "",
      dateTime: "",
      privacy: "Private",
      tags: [] as string[],
      surpriseMode: false,
      mediaType: undefined,
    });
    setTagInput("");
  };

  return {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleTagInputKeyDown,
    removeTag,
    resetForm,
  };
};
