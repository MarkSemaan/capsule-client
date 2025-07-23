import { useCallback } from "react";

interface UseFileUploadProps {
  onMediaTypeChange: (type: "audio" | "image") => void;
}

export const useFileUpload = ({ onMediaTypeChange }: UseFileUploadProps) => {
  const handleAudioUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onMediaTypeChange("audio");
      }
    },
    [onMediaTypeChange]
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onMediaTypeChange("image");
      }
    },
    [onMediaTypeChange]
  );

  return {
    handleAudioUpload,
    handleImageUpload,
  };
};
