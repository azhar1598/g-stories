"use client";
import { postWebStoryToWordPress } from "@/lib/wordpress";
import { useState } from "react";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState([
    {
      id: Date.now(),
      image: "",
      text: "",
      alt: "",
      autoAdvanceAfter: "5s",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const addPage = () => {
    setPages([
      ...pages,
      { id: Date.now(), image: "", text: "", alt: "", autoAdvanceAfter: "5s" },
    ]);
  };

  const handlePageChange = (index: number, field: string, value: string) => {
    const newPages = pages.slice();
    newPages[index][field] = value;
    setPages(newPages);
  };

  const removePage = (index: number) => {
    const newPages = pages.slice();
    newPages.splice(index, 1);
    setPages(newPages);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const storyContent = `
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <amp-story
      standalone
      publisher=""
      title="${title}"
      publisher-logo-src="https://codzify.com/dash/imgs/main_icons/codzfy_without_border.png"
      poster-portrait-src="https://codzify.com/assets/images/stories/tellMeAboutYourself/poster.jpg"
    >
      ${pages
        .map(
          (page, i) => `
      <amp-story-page id="page-${i + 1}" auto-advance-after="${
            page.autoAdvanceAfter
          }">
        <amp-grid-layer template="fill">
          <amp-img
            src="${page.image}"
            width="900"
            height="1600"
            alt="${page.alt}"
          ></amp-img>
        </amp-grid-layer>
        <amp-grid-layer template="vertical">
          <h1>${page.text}Hello world</h1>
        </amp-grid-layer>
      </amp-story-page>
      `
        )
        .join("")}
    </amp-story>
    `;

    const storyData = {
      title: title,
      content: storyContent,
      story_data: {
        pages: pages.map((page, i) => ({
          id: `page-${i + 1}`,
          elements: [
            {
              type: "image",
              src: page.image,
              position: { x: 0, y: 0 },
              size: { width: 100, height: 100 },
              layer: 0,
              opacity: 1,
            },
            {
              type: "text",
              content: page.text,
              position: { x: 20, y: 20 },
              size: { width: 60, height: 20 },
              layer: 1,
              color: "#ffffff",
              fontSize: 24,
            },
          ],
        })),
      },
    };

    try {
      await postWebStoryToWordPress(storyData);
      setMessage("Web Story posted successfully!");
      setTitle("");
      setPages([
        {
          id: Date.now(),
          image: "",
          text: "",
          alt: "",
          autoAdvanceAfter: "5s",
        },
      ]);
    } catch (error) {
      setMessage("Failed to post Web Story.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  { maxWidth: "600px", margin: "0 auto", padding: "20px" }

  // useEffect(()=>{
    const styleData={ maxWidth: "600px", margin: "0 auto", padding: "20px" }
    // styleData
  // })

  return (
    <div style={styleData}>
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
        {pages.map((page, index) => (
          <div key={page.id} style={{ marginBottom: "20px" }}>
            <h2>Page {index + 1}</h2>
            <div>
              <label htmlFor={`image-${index}`}>Image URL</label>
              <input
                type="text"
                id={`image-${index}`}
                value={page.image}
                onChange={(e) =>
                  handlePageChange(index, "image", e.target.value)
                }
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor={`text-${index}`}>Text Content</label>
              <textarea
                id={`text-${index}`}
                value={page.text}
                onChange={(e) =>
                  handlePageChange(index, "text", e.target.value)
                }
                required
                rows={3}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor={`alt-${index}`}>Image Alt Text</label>
              <input
                type="text"
                id={`alt-${index}`}
                value={page.alt}
                onChange={(e) => handlePageChange(index, "alt", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor={`autoAdvanceAfter-${index}`}>
                Auto Advance After (seconds)
              </label>
              <input
                type="text"
                id={`autoAdvanceAfter-${index}`}
                value={page.autoAdvanceAfter}
                onChange={(e) =>
                  handlePageChange(index, "autoAdvanceAfter", e.target.value)
                }
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <button
              type="button"
              onClick={() => removePage(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#ff0000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Remove Page
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Add Another Page
        </button>
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
