import React from "react";
import styles from "./CreateCapsule.module.css";
import { useCapsuleForm } from "../../../hooks/useCapsuleForm";
import { useModal } from "../../../hooks/useModal";
import { useFileUpload } from "../../../hooks/useFileUpload";

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

  const { handleSubmit, handleBackClick } = useModal({
    isOpen,
    onClose,
    onSubmit,
  });

  const { handleAudioUpload, handleImageUpload } = useFileUpload({
    onMediaTypeChange: (type) => handleInputChange("mediaType", type),
  });

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleBackClick} className={styles.backButton}>
            ←
          </button>
          <h2 className={styles.title}>Create Capsule</h2>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e, formData, resetForm)}
          className={styles.form}
        >
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
                placeholder="Tag"
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

          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
