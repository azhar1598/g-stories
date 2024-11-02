"use client";
import { Button } from "@mantine/core";
import React, { useState } from "react";

const AmpStoryFromSlides = () => {
  const [showContent, setShowContent] = useState(false);

  const slides = [
    {
      id: 1,
      styles: {
        backgroundImage:
          "url(blob:http://localhost:3000/5337f114-5701-4608-b836-f4c72d85126c)",
        backgroundColor: "#B24592",
      },
      elements: [
        {
          id: 1730566692968,
          tag: "h1",
          styles: {
            fontSize: "42px",
            fontWeight: "500",
            width: "200px",
            position: "absolute",
            cursor: "all-scroll",
            border: "1px solid rgb(59, 130, 246)",
            transform: "translate(35px, 94px)",
            height: "126px",
            textAlign: "center",
          },
          content: "orange army",
        },
        {
          id: 1730566707386,
          tag: "p",
          styles: {
            fontSize: "16px",
            width: "200px",
            position: "absolute",
            cursor: "all-scroll",
            border: "1px solid rgb(59, 130, 246)",
            transform: "translate(31px, 279px)",
            height: "24px",
            textAlign: "center",
            color: "#184491",
          },
          content: "Global",
        },
      ],
    },
    {
      id: 2,
      styles: {
        backgroundImage:
          "url(blob:http://localhost:3000/ab77d5d0-dc35-4c76-82c9-24934c1b8db3)",
        backgroundColor: "#B24592",
      },
      elements: [
        {
          id: 1730566730301,
          tag: "h1",
          styles: {
            fontSize: "42px",
            fontWeight: "500",
            width: "200px",
            position: "absolute",
            cursor: "all-scroll",
            border: "1px solid rgb(59, 130, 246)",
            transform: "translate(8px, 124px)",
            height: "63px",
            textAlign: "right",
            backgroundColor: "#3d0a2e",
          },
          content: "Red World",
        },
        {
          id: 1730566743283,
          tag: "h3",
          styles: {
            fontSize: "18px",
            fontWeight: "500",
            width: "200px",
            position: "absolute",
            cursor: "all-scroll",
            border: "1px solid rgb(59, 130, 246)",
            transform: "translate(38px, 47px)",
          },
          content: "New Era",
        },
      ],
    },
    {
      id: 3,
      styles: {
        backgroundImage: "",
        backgroundColor: "#B24592",
      },
      elements: [
        {
          id: 1730566760318,
          tag: "h3",
          styles: {
            fontSize: "18px",
            fontWeight: "500",
            width: "200px",
            position: "absolute",
            cursor: "all-scroll",
            border: "1px solid rgb(59, 130, 246)",
            transform: "translate(50px, 112px)",
            height: "27px",
          },
          content: "First Cry",
        },
      ],
    },
  ];

  // Convert transform string to AMP-compatible positioning
  const getPosition = (transformString) => {
    const matches = transformString.match(/translate\((\d+)px,\s*(\d+)px\)/);
    if (matches) {
      return {
        left: `${matches[1]}px`,
        top: `${matches[2]}px`,
      };
    }
    return { left: "0px", top: "0px" };
  };

  // Create AMP-compatible styles
  const createAmpStyles = (styles) => {
    const position = getPosition(styles.transform || "");
    return {
      ...styles,
      position: "absolute",
      left: position.left,
      top: position.top,
      transform: undefined, // Remove transform as we're using absolute positioning
      cursor: undefined, // Remove cursor as it's not needed in AMP
      border: undefined, // Remove border as it was for editing purposes
    };
  };

  const generateAmpStoryContent = () => {
    return `<!DOCTYPE html>
    <html ⚡>
      <head>
        <meta charset="utf-8">
        <title>Dynamic AMP Story</title>
        <link rel="canonical" href="story.html">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
        <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
        <style amp-custom>
          amp-story-page {
            background-color: #B24592;
          }
          .element-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <amp-story
          standalone
          title="Dynamic Story"
          publisher="Your Name"
          publisher-logo-src="assets/logo.png"
          poster-portrait-src="assets/cover.jpg"
        >
          ${slides
            .map(
              (slide) => `
            <amp-story-page id="page-${slide.id}">
              <amp-story-grid-layer template="fill">
                <div style="background-color: ${
                  slide.styles.backgroundColor
                }; ${
                slide.styles.backgroundImage
                  ? `background-image: ${slide.styles.backgroundImage};`
                  : ""
              } width: 100%; height: 100%;"></div>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical">
                <div class="element-wrapper">
                  ${slide.elements
                    .map(
                      (element) => `
                    <${element.tag} 
                      style="${Object.entries(createAmpStyles(element.styles))
                        .filter(([key, value]) => value !== undefined)
                        .map(
                          ([key, value]) =>
                            `${key
                              .replace(/([A-Z])/g, "-$1")
                              .toLowerCase()}: ${value}`
                        )
                        .join("; ")}"
                    >
                      ${element.content}
                    </${element.tag}>
                  `
                    )
                    .join("")}
                </div>
              </amp-story-grid-layer>
            </amp-story-page>
          `
            )
            .join("")}
        </amp-story>
      </body>
    </html>`;
  };

  const handleClick = () => {
    setShowContent(true);
    const ampContent = generateAmpStoryContent();

    // Parse and inject the AMP content
    const parser = new DOMParser();
    const doc = parser.parseFromString(ampContent, "text/html");

    // Add scripts
    const scripts = doc.getElementsByTagName("script");
    Array.from(scripts).forEach((script) => {
      const newScript = document.createElement("script");
      if (script.src) {
        newScript.src = script.src;
      }
      if (script.getAttribute("custom-element")) {
        newScript.setAttribute(
          "custom-element",
          script.getAttribute("custom-element")
        );
      }
      newScript.async = true;
      document.head.appendChild(newScript);
    });

    // Add styles
    const styles = doc.getElementsByTagName("style");
    Array.from(styles).forEach((style) => {
      const newStyle = document.createElement("style");
      newStyle.textContent = style.textContent;
      if (style.getAttribute("amp-boilerplate")) {
        newStyle.setAttribute("amp-boilerplate", "");
      }
      if (style.getAttribute("amp-custom")) {
        newStyle.setAttribute("amp-custom", "");
      }
      document.head.appendChild(newStyle);
    });

    // Replace body content with AMP story
    const story = doc.querySelector("amp-story");
    if (story) {
      document.body.innerHTML = "";
      document.body.appendChild(story);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleClick} className="mb-4" disabled={showContent}>
        Show AMP Story
      </Button>
    </div>
  );
};

export default AmpStoryFromSlides;