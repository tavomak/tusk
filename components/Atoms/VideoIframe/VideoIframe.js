const VideoIframe = ({ videoId }) => (
  <div className="relative object-contain w-full h-full overflow-hidden aspect-video">
    <iframe
      title="vimeo-player"
      src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      className="absolute top-0 left-0 object-contain w-full h-full"
    />
  </div>
);

export default VideoIframe;
