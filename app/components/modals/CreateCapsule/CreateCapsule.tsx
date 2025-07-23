import React, { useState } from "react";
import styles from "./CreateCapsule.module.css";
import { useCapsuleForm } from "../../../hooks/useCapsuleForm";
import { useModal } from "../../../hooks/useModal";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useModalClose } from "../../../hooks/useModalClose";
import { capsuleAPI, mediaAPI, tagAPI } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

interface CreateCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (capsuleData: any) => void;
}

const CreateCapsule = ({ isOpen, onClose, onSubmit }: CreateCapsuleProps) => {
  const {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleTagInputKeyDown,
    removeTag,
    resetForm,
  } = useCapsuleForm();

  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { handleOverlayClick } = useModalClose({ isOpen, onClose });

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
      // Create the capsule
      const capsuleData = {
        message: formData.message,
        reveal_date: new Date(formData.dateTime).toISOString(),
        privacy: formData.privacy.toLowerCase(),
        surprise_mode: formData.surpriseMode,
      };

      const capsuleResponse = await capsuleAPI.create(capsuleData);
      const capsuleId = capsuleResponse.id;

      // Upload media if selected
      if (selectedFile && capsuleId) {
        console.log(
          "Uploading media file:",
          selectedFile.name,
          "for capsule:",
          capsuleId
        );
        try {
          const mediaResponse = await mediaAPI.upload(capsuleId, selectedFile);
          console.log("Media upload successful:", mediaResponse);
        } catch (mediaError: any) {
          console.error("Media upload failed:", mediaError.response?.data);
          // Show specific error message to user
          const errorMessage =
            mediaError.response?.data?.message ||
            mediaError.response?.data?.error ||
            "Failed to upload media file";
          setError(`Media upload error: ${errorMessage}`);
          setIsLoading(false);
          return; // Stop the process if media upload fails
        }
      }

      // Create and attach tags
      if (formData.tags.length > 0) {
        for (const tagName of formData.tags) {
          try {
            let tagId: number;

            // First try to find existing tag
            try {
              const existingTag = await tagAPI.findByName(tagName);
              tagId = existingTag.id;
            } catch (findError: any) {
              // Tag doesn't exist, create it
              const tagResponse = await tagAPI.create({ name: tagName });
              tagId = tagResponse.id;
            }

            // Attach tag to capsule
            await tagAPI.attachToCapsule(capsuleId, tagId);
          } catch (tagError: any) {
            console.error(`Error processing tag "${tagName}":`, tagError);
          }
        }
      }

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(capsuleResponse);
      }

      // Reset form and close modal
      resetForm();
      setSelectedFile(null);
      onClose();
    } catch (error: any) {
      console.error("Error creating capsule:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create capsule. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleBackClick} className={styles.backButton}>
            ←
          </button>
          <h2 className={styles.title}>Create Capsule</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.messageSection}>
            <textarea
              className={styles.messageInput}
              placeholder="Write a message to your future self"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.mediaButtons}>
            <label
              className={`${styles.mediaButton} ${
                formData.mediaType === "audio" ? styles.active : ""
              }`}
            >
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                style={{ display: "none" }}
              />
              🎤 Audio
            </label>
            <label
              className={`${styles.mediaButton} ${
                formData.mediaType === "image" ? styles.active : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              📷 Image
            </label>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              📅
              <input
                type="datetime-local"
                className={styles.input}
                value={formData.dateTime}
                onChange={(e) => handleInputChange("dateTime", e.target.value)}
                placeholder="Select date and time"
              />
              ▼
            </div>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              🔒
              <select
                className={styles.input}
                value={formData.privacy}
                onChange={(e) => handleInputChange("privacy", e.target.value)}
              >
                <option value="Private">Status: Private</option>
                <option value="Public">Status: Public</option>
                <option value="Unlisted">Status: Unlisted</option>
              </select>
            </div>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="Add tag (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </div>
            {formData.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {formData.tags.map((tag: string, index: number) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className={styles.tagRemove}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.surpriseModeSection}>
            <div className={styles.surpriseModeContent}>
              <div>
                <h3 className={styles.surpriseModeTitle}>Surprise Mode</h3>
                <p className={styles.surpriseModeDescription}>
                  Keep this capsule hidden even to yourself
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.surpriseMode}
                  onChange={(e) =>
                    handleInputChange("surpriseMode", e.target.checked)
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={styles.createButton}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
