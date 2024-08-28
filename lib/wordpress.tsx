import axios from "axios";

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const APP_PASSWORD: any = process.env.NEXT_PUBLIC_WORDPRESS_APP_PASSWORD;
const USERNAME: any = process.env.NEXT_PUBLIC_WORDPRESS_USERNAME;

console.log("username", USERNAME, APP_PASSWORD);
export async function postWebStoryToWordPress(storyData: any) {
  try {
    const response = await axios.post(
      `${WORDPRESS_URL}/wp-json/web-stories/v1/web-story`,
      {
        title: storyData.title,
        content: storyData.content, // HTML content
        story_data: storyData.story_data, // JSON or object that defines the Web Story
        status: "publish", // Optional, can be 'draft' or 'publish'
      },
      {
        auth: {
          username: USERNAME,
          password: APP_PASSWORD,
        },
      }
    );
    console.log("Web Story posted successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error posting Web Story to WordPress:",
      error.response?.data || error.message
    );
    throw error;
  }
}
