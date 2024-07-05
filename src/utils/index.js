export const getInitials = (name) => {
  if (!name) return "";
  const nameArray = name.split(" ");
  const initials = nameArray
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
};
