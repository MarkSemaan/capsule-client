import { useState } from "react";
import { useEffect } from "react";
import { capsuleAPI, mediaAPI, tagAPI } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

interface CreateCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (capsuleData: any) => void;
}

export const useCreateCapsuleLogic = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateCapsuleProps) => {
  const [formData, setFormData] = useState({
    message: "",
    dateTime: "",
    privacy: "Private",
    tags: [] as string[],
    surpriseMode: false,
    mediaType: undefined as "audio" | "image" | undefined,
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      handleInputChange("mediaType", "audio");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      handleInputChange("mediaType", "image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please log in to create a capsule");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter a message");
      return;
    }

    if (!formData.dateTime) {
      setError("Please select a reveal date");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const capsuleData = {
        message: formData.message,
        reveal_date: new Date(formData.dateTime).toISOString(),
        privacy: formData.privacy.toLowerCase(),
        surprise_mode: formData.surpriseMode,
      };

      const capsuleResponse = await capsuleAPI.create(capsuleData);
      const capsuleId = capsuleResponse.id;

      if (selectedFile && capsuleId) {
        try {
          await mediaAPI.upload(capsuleId, selectedFile);
        } catch (mediaError: any) {
          const errorMessage =
            mediaError.response?.data?.message || "Failed to upload media file";
          setError(`Media upload error: ${errorMessage}`);
          setIsLoading(false);
          return;
        }
      }

      if (formData.tags.length > 0) {
        for (const tagName of formData.tags) {
          try {
            const tag = await tagAPI.create({ name: tagName });
            await tagAPI.attachToCapsule(capsuleId, tag.id);
          } catch (error) {}
        }
      }

      onSubmit?.(capsuleResponse);
      resetForm();
      setSelectedFile(null);
      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to create capsule. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleTagInputKeyDown,
    removeTag,
    isLoading,
    error,
    selectedFile,
    handleOverlayClick,
    handleBackClick,
    handleAudioUpload,
    handleImageUpload,
    handleSubmit,
  };
};
