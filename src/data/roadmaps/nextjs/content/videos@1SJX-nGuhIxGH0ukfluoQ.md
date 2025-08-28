# Videos
To use and optimize videos in a Next.js application, serve modern formats like MP4 or WebM through the video tag with attributes such as controls, muted, and preload="metadata", lazy-load them to improve performance, provide multiple resolutions or adaptive streaming for responsiveness, deliver them via a CDN with proper caching, and include captions or fallback text for accessibility.

Videos can be embedded on a page using the HTML video tag for direct video files and iframe for external platform-hosted videos.

# Video best practices
Fallback Content: When using the video tag, include fallback content inside the tag for browsers that do not support video playback.

Subtitles or Captions: Include subtitles or captions for users who are deaf or hard of hearing. Utilize the track tag with your video elements to specify caption file sources.

Accessible Controls: Standard HTML5 video controls are recommended for keyboard navigation and screen reader compatibility. 

For advanced needs, consider third-party players like react-player or video.js, which offer accessible controls and consistent browser experience.

Visit the following resources to learn more:

- [@official@How to use and optimize videos](https://nextjs.org/docs/app/guides/videos)
