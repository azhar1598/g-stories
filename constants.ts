export const getStyleForType = (item) => {
  switch (item.tag) {
    case "h1":
      return {
        fontSize: item.styles?.fontSize || "42px",
        fontWeight: item.styles?.fontWeight || "500",
      };
    case "h2":
      return {
        fontSize: item?.styles?.fontSize || "20px",
        fontWeight: item?.styles?.fontWeight || "500",
      };
    case "h3":
      return {
        fontSize: item?.styles?.fontSize || "18px",
        fontWeight: item?.styles?.fontWeight || "500",
      };
    case "p":
      return { fontSize: item?.styles?.fontSize || "16px" };
    case "small":
      return { fontSize: item?.styles?.fontSize || "14px" };
    default:
      return { fontSize: item?.styles?.fontSize || "16px" };
  }
};
