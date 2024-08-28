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

    function encodeForWebStories(content: string): string {
      // URL-encode the content
      const encodedContent = encodeURIComponent(content);

      // Prepend the identifier
      return `__WEB_STORIES_ENCODED__${encodedContent}`;
    }

    const storyContentTest = `<p><html amp="" lang="en"><head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <script async="" src="https://cdn.ampproject.org/v0.js"></script>
          <script async="" src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>
          <link href="https://fonts.googleapis.com/css2?display=swap&amp;family=Roboto%3Awght%40700"
             rel="stylesheet" />
          <link
             href="https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=3600&amp;h=2401&amp;fit=max"
             rel="preload" as="image" />
          <style amp-boilerplate="">
             body {
             -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
             -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
             -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
             animation: -amp-start 8s steps(1, end) 0s 1 normal both
             }
             @-webkit-keyframes -amp-start {
             from {
             visibility: hidden
             }
             to {
             visibility: visible
             }
             }
             @-moz-keyframes -amp-start {
             from {
             visibility: hidden
             }
             to {
             visibility: visible
             }
             }
             @-ms-keyframes -amp-start {
             from {
             visibility: hidden
             }
             to {
             visibility: visible
             }
             }
             @-o-keyframes -amp-start {
             from {
             visibility: hidden
             }
             to {
             visibility: visible
             }
             }
             @keyframes -amp-start {
             from {
             visibility: hidden
             }
             to {
             visibility: visible
             }
             }
          </style>
 <p><noscript></p>
 <style amp-boilerplate="">
 body {
 -webkit-animation: none;
 -moz-animation: none;
 -ms-animation: none;
 animation: none
 }
 </style><p></noscript></p><style amp-custom="">
 h1,
 h2,
 h3 {
 font-weight: normal;
 }
 </p><p>amp-story-page {
 background-color: #131516;
 }
 </p><p>amp-story-grid-layer {
 overflow: visible;
 }
 </p><p>@media (max-aspect-ratio: 9 / 16) {
 @media (min-aspect-ratio: 320 / 678) {
 amp-story-grid-layer.grid-layer {
 margin-top: calc((100% / 0.5625 - 100% / 0.6666666666666666) / 2);
 }
 }
 }
 </p><p>@media not all and (min-resolution:.001dpcm) {
 @media {
 p.text-wrapper>span {
 font-size: calc(100% - 0.5px);
 }
 }
 }
 </p><p>.page-fullbleed-area,
 .page-background-overlay-area {
 position: absolute;
 overflow: hidden;
 width: 100%;
 left: 0;
 height: calc(1.1851851851851851 * 100%);
 top: calc((1 - 1.1851851851851851) * 100% / 2);
 }
 </p><p>.element-overlay-area {
 position: absolute;
 width: 100%;
 height: 100%;
 top: 0;
 left: 0;
 }
 </p><p>.page-safe-area {
 overflow: visible;
 position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 width: 100%;
 height: calc(0.84375 * 100%);
 margin: auto 0;
 }
 </p><p>.mask {
 position: absolute;
 overflow: hidden;
 }
 </p><p>.fill {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 margin: 0;
 }
 </p><p>@media (prefers-reduced-motion: no-preference) {
 .animation-wrapper {
 opacity: var(--initial-opacity);
 transform: var(--initial-transform);
 }
 }
 </p><p>amp-story-grid-layer.align-bottom {
 align-content: end;
 padding: 0;
 /*                   AMP CTA Layer will exactly occupy 74px regardless of any device.                  To space out captions 74px from the BOTTOM (AMP CTA Layer),                  74px from the TOP should also be spaced out and thus: 2 * 74px                  will be the desired max-height.                */
 max-height: calc(100vh - (2 * 74px));
 }
 </p><p>.captions-area {
 padding: 0 32px 0;
 }
 </p><p>amp-story-captions {
 margin-bottom: 16px;
 text-align: center;
 }
 </style><p>
 <meta name="web-stories-replace-head-start" />
 <title>Test Story</title>
 <link rel="canonical" href="https://mrchatwala.com/?post_type=web-story&amp;p=138" />
 <meta name="web-stories-replace-head-end" />
 </head>
 <body>
 <amp-story standalone="" publisher="Mr.Chatwala" publisher-logo-src="" title="Test Story"
    poster-portrait-src="https://mrchatwala.com/wp-content/uploads/2024/04/cropped-ebfd2282-1596-48e6-beb7-5b010786314f.jpeg">
 <amp-story-page
    id="9586339a-ec75-4850-982a-041b920a5148" auto-advance-after="7s"><amp-story-grid-layer
    template="vertical" aspect-ratio="412:618" class="grid-layer">
 </p><div class="page-fullbleed-area" style="background-color:#d9d9c0"><div class="page-safe-area"><div
    style="position:absolute;pointer-events:none;left:0;top:-9.25926%;width:100%;height:118.51852%;opacity:1">
 <div
    style="pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0"
    class="mask" id="el-1e6e35a3-08c6-4257-8f93-d6e073854ed7"><div
    style="position:absolute;width:266.55561%;height:100%;left:-83.2778%;top:0%"
    data-leaf-element="true"><amp-img layout="fill"
 src="https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=3600&amp;h=2401&amp;fit=max"
 alt="A man sitting in front of a laptop computer"
 srcSet="https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=3600&amp;h=2401&amp;fit=max
 3600w,https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=2880&amp;h=1921&amp;fit=max
 2880w,https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=2160&amp;h=1441&amp;fit=max
 2160w,https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=1440&amp;h=960&amp;fit=max
 1440w,https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=720&amp;h=480&amp;fit=max
 720w,https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?ixid=M3wxMzcxOTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNDc3NjIyOHw&amp;ixlib=rb-4.0.3&amp;fm=jpg&amp;w=340&amp;h=227&amp;fit=max
 340w" sizes="(min-width: 1024px) 120vh, 267vw" disable-inline-width="true"></amp-img></div>
 </div></div></div></div><p></amp-story-grid-layer><amp-story-grid-layer template="vertical"
    aspect-ratio="412:618" class="grid-layer"></p><div class="page-fullbleed-area"><div
    class="page-safe-area"><div
    style="position:absolute;pointer-events:none;left:7.52427%;top:3.39806%;width:48.54369%;height:7.11974%;opacity:1">
 <div
 style="pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:1%
 1% 1% 1% / 4.545454545454546% 4.545454545454546% 4.545454545454546% 4.545454545454546%"
 id="el-f1281763-f44a-44c7-a732-74a0b60133c1"><h1 class="fill text-wrapper"
 style="white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:-0.25312499999999893%
 0;font-family:&quot;Roboto&quot;,&quot;Helvetica
 Neue&quot;,&quot;Helvetica&quot;,sans-serif;font-size:0.582524em;line-height:1.2;text-align:left;padding:0;color:#000000">
 <span><span style="font-weight: 700; color: #003bad">Hello World</span></span></h1></div>
 </div><div
    style="position:absolute;pointer-events:none;left:7.52427%;top:12.62136%;width:45.14563%;height:6.79612%;opacity:1">
 <div
 style="pointer-events:initial;width:100%;height:100%;display:block;position:absolute;top:0;left:0;z-index:0;border-radius:1.0752688172043012%
 1.0752688172043012% 1.0752688172043012% 1.0752688172043012% / 4.761904761904762% 4.761904761904762%
 4.761904761904762% 4.761904761904762%" id="el-bf465de6-93e4-46ad-8c73-58611c644d2a"><h2
 class="fill text-wrapper"
 style="white-space:pre-line;overflow-wrap:break-word;word-break:break-word;margin:-0.17540322580645062%
 0;font-family:&quot;Roboto&quot;,&quot;HelveticaNeue&quot;,&quot;Helvetica&quot;,sans-serif;font-size:0.582524em;line-height:1.19;text-align:left;padding:0;color:#000000">
 <span><span style="font-weight: 700">I am Avez</span></span></h2></div></div></div></div>
 <p>
 </amp-story-grid-layer>
 </amp-story-page>
 </amp-story>
 </body> </html><p/>`;

    const newStoryContent = `<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
<body>
  <amp-story standalone title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
  </amp-story>
</body>
 
 `;

    const testStory = `<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    ></script>
    <link
      href="https://fonts.googleapis.com/css?family=Oswald:200,300,400"
      rel="stylesheet"
    />
    <style amp-custom>
      amp-story {
        font-family: "Oswald", sans-serif;
        color: #fff;
      }
      amp-story-page {
        background-color: #000;
      }
      h1 {
        font-weight: bold;
        font-size: 2.875em;
        font-weight: normal;
        line-height: 1.174;
      }
      p {
        font-weight: normal;
        font-size: 1.3em;
        line-height: 1.5em;
        color: #fff;
      }
      q {
        font-weight: 300;
        font-size: 1.1em;
      }
      amp-story-grid-layer.bottom {
        align-content: end;
      }
      amp-story-grid-layer.noedge {
        padding: 0px;
      }
      amp-story-grid-layer.center-text {
        align-content: center;
      }
      .wrapper {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
      }
      .banner-text {
        text-align: center;
        background-color: #000;
        line-height: 2em;
      }
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="https://images.pexels.com/photos/1300355/pexels-photo-1300355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="https://images.pexels.com/photos/1931370/pexels-photo-1931370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 (Cat): 1 layer (vertical) -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 2 (Dog): 2 layers (fill + thirds) -->
      <amp-story-page id="page2">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="thirds">
          <h1 grid-area="upper-third">Dogs</h1>
          <p grid-area="lower-third">
            Dogs were probably the first tame animals. They have accompanied
            humans for some 10,000 years. Some scientists assert that all dogs,
            domestic and wild, share a common ancestor in the small South Asian
            wolf.
          </p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 3 (Bird): 3 layers (fill + vertical + vertical) + Audio-->
      <amp-story-page id="page3" background-audio="assets/bird-singing.mp3">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=800"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>Birds</h1>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical" class="bottom">
          <q
            >A bird is three things: Feathers, flight and song, And feathers are
            the least of these. -Marjorie Allen Seiffert</q
          >
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 4 (Rabbit): 3 layers (fill (video) + vertical + vertical) -->
      <amp-story-page id="page4">
        <amp-story-grid-layer template="fill">
          <amp-video
            autoplay
            loop
            width="720"
            height="1280"
            poster="assets/rabbit.jpg"
            layout="responsive"
          >
            <source
              src="https://videos.pexels.com/video-files/4823938/4823938-uhd_1440_2560_24fps.mp4"
              type="video/mp4"
            />
          </amp-video>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>Rabbits</h1>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical" class="bottom">
          <p>
            Rabbits can learn to follow simple voice commands and come when
            called by name, and are curious and playful.
          </p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 5 (Collage): 2 layers + animations -->
      <amp-story-page id="page5">
        <amp-story-grid-layer template="vertical" class="noedge">
          <div class="wrapper">
            <amp-img
              src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=800"
              width="720"
              height="1280"
              layout="responsive"
              animate-in="fade-in"
              animate-in-delay="0.4s"
            >
            </amp-img>
            <amp-img
              src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"
              width="720"
              height="1280"
              layout="responsive"
              animate-in="fade-in"
              animate-in-delay="0.6s"
            >
            </amp-img>
            <amp-img
              src="https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width="720"
              height="1280"
              layout="responsive"
              animate-in="fade-in"
              animate-in-delay=".8s"
            >
            </amp-img>
            <amp-img
              src="https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=800"
              width="720"
              height="1280"
              layout="responsive"
              animate-in="fade-in"
              animate-in-delay="1s"
            >
            </amp-img>
          </div>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical" class="center-text">
          <p class="banner-text" animate-in="whoosh-in-right">
            Pets can lower your stress levels!
          </p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Bookend -->
      <amp-story-bookend
        src="bookend.json"
        layout="nodisplay"
      ></amp-story-bookend>
    </amp-story>
  </body>
</html>`;

    const storyData = {
      title: title,
      content: testStory,
      modified: "2024-08-28T15:09:09",
      password: "",
      slug: "success-rate",
      status: "publish",
      storyId: 159,
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
      story_poster: {
        id: 139,
        url: "https://wp.stories.google/stories/seo-must-knows-for-web-stories/assets/storie_elements_poster_yes_smartphone_ia.png",
        width: 640,
        height: 853,
        needsProxy: false,
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

  // useEffect(()=>{
  const styleData = { maxWidth: "600px", margin: "0 auto", padding: "20px" };
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
