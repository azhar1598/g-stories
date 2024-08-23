"use client";
import { postWebStoryToWordPress } from "@/lib/wordpress";
import { useState } from "react";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const encodeContent = (html) => {
    return Buffer.from(html).toString("base64");
  };

  const storyData = {
    title: "New 4th Web Story with Background Image",
    content: `
  <script async src="https://cdn.ampproject.org/v0.js"></script>
<script
  async
  custom-element="amp-story"
  src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
></script>
    <amp-story
  standalone
  publisher=""
  title=""
  publisher-logo-src="https://codzify.com/dash/imgs/main_icons/codzfy_without_border.png"
  poster-portrait-src="https://codzify.com/assets/images/stories/tellMeAboutYourself/poster.jpg"
>
  <amp-story-page id="my-first-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/1.jpg"
        width="900"
        height="1600"
        alt="This is my First Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>

  <amp-story-page id="my-second-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/2.jpg"
        width="900"
        height="1600"
        alt="This is my Second Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>

  <amp-story-page id="my-third-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/3.jpg"
        width="900"
        height="1600"
        alt="This is my Third Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>

  <amp-story-page id="my-fourth-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/4.jpg"
        width="900"
        height="1600"
        alt="This is my Fourth Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>

  <amp-story-page id="my-fifth-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/5.jpg"
        width="900"
        height="1600"
        alt="This is my Fifth Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>

  <amp-story-page id="my-sixth-page" " auto-advance-after="5s">
    <amp-grid-layer template="fill">
      <amp-img
        src="https://codzify.com/assets/images/stories/tellMeAboutYourself/6.jpg"
        width="900"
        height="1600"
        alt="This is my Sixth Image"
      >
      </amp-img>
    </amp-grid-layer>
  </amp-story-page>
</amp-story>
    `,
    story_data: {
      pages: [
        {
          id: "page-1",
          elements: [
            {
              type: "image",
              src: "https://images.pexels.com/photos/18408911/pexels-photo-18408911/free-photo-of-sunlight-behind-trees-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Example background image
              position: { x: 0, y: 0 },
              size: { width: 100, height: 100 }, // Full-screen background
              layer: 0, // Background layer (bottom layer)
              opacity: 1,
            },
            {
              type: "text",
              content: "Welcome to My Web Story!",
              position: { x: 20, y: 20 },
              size: { width: 60, height: 20 },
              layer: 1, // Text layer (above the background)
              color: "#ffffff", // White text color
              fontSize: 24,
            },
            {
              type: "image",
              src: "https://images.pexels.com/photos/18408911/pexels-photo-18408911/free-photo-of-sunlight-behind-trees-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Example image
              position: { x: 20, y: 60 },
              size: { width: 30, height: 30 },
              layer: 1, // Image layer
            },
          ],
        },
        {
          id: "page-2",
          elements: [
            {
              type: "image",
              src: "https://images.pexels.com/photos/16756544/pexels-photo-16756544/free-photo-of-bird-flying-on-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Another background image
              position: { x: 0, y: 0 },
              size: { width: 100, height: 100 }, // Full-screen background
              layer: 0, // Background layer
              opacity: 1,
            },
            {
              type: "text",
              content: "Another Page with More Content",
              position: { x: 20, y: 20 },
              size: { width: 60, height: 20 },
              layer: 1, // Text layer
              color: "#ffffff", // White text color
              fontSize: 24,
            },
            {
              type: "image",
              src: "https://images.pexels.com/photos/10651174/pexels-photo-10651174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Example image
              position: { x: 20, y: 60 },
              size: { width: 30, height: 30 },
              layer: 1, // Image layer
            },
          ],
        },
      ],
    },
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await postWebStoryToWordPress(storyData);
      setMessage("Web Story posted successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      setMessage("Failed to post Web Story.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Create a Web Story</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Posting..." : "Post Web Story"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
