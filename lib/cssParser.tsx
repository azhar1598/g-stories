export const cssToJsx = (cssString) => {
  const cssObject = {};

  // Split the CSS string by semicolon to get individual rules
  const rules = cssString.split(";").filter(Boolean);

  // Convert each rule into camelCase and add to the cssObject
  rules.forEach((rule) => {
    const [property, value] = rule.split(":").map((item) => item.trim());

    // Convert kebab-case (CSS) to camelCase (JSX)
    const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
      g[1].toUpperCase()
    );

    cssObject[camelCaseProperty] = value;
  });

  return cssObject;
};
