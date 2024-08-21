import Head from "next/head";

export const config = { amp: true };

function MyAmpPage() {
  return (
    <>
      <amp-story
        standalone
        publisher=""
        title=""
        publisher-logo-src="https://codzify.com/dash/imgs/main_icons/codzfy_without_border.png"
        poster-portrait-src="https://codzify.com/assets/images/stories/tellMeAboutYourself/poster.jpg"
      >
        <amp-story-page id="my-first-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/1.jpg"
              width="900"
              height="1600"
              alt="This is my First Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>

        <amp-story-page id="my-second-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/2.jpg"
              width="900"
              height="1600"
              alt="This is my Second Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>

        <amp-story-page id="my-third-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/3.jpg"
              width="900"
              height="1600"
              alt="This is my Third Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>

        <amp-story-page id="my-fourth-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/4.jpg"
              width="900"
              height="1600"
              alt="This is my Fourth Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>

        <amp-story-page id="my-fifth-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/5.jpg"
              width="900"
              height="1600"
              alt="This is my Fifth Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>

        <amp-story-page id="my-sixth-page" auto-advance-after="5s">
          <amp-grid-layer template="fill">
            <amp-img
              src="https://codzify.com/assets/images/stories/tellMeAboutYourself/6.jpg"
              width="900"
              height="1600"
              alt="This is my Sixth Image"
            ></amp-img>
          </amp-grid-layer>
        </amp-story-page>
      </amp-story>
    </>
  );
}

export default MyAmpPage;
