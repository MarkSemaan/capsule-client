export const useDateFormatter = () => {
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return {
    formatDate,
    formatShortDate,
  };
};
