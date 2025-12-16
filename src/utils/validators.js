export function validateImage(file) {
  if (!file) return { valid: true };

  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 1024 * 1024; // 1MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, message: "Only JPG or PNG allowed" };
  }

  if (file.size > maxSize) {
    return { valid: false, message: "Image must be under 1MB" };
  }

  return { valid: true };
}
