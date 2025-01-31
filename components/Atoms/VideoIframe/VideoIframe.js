const VideoIframe = ({ videoId, controls = false }) => (
  <div className="relative object-contain w-full h-full overflow-hidden aspect-video">
    <iframe
      title="vimeo-player"
      src={`https://player.vimeo.com/video/${videoId}?${controls ? 'autoplay=1&loop=1&autopause=0?badge=0&amp;autopause=0' : 'background=1&autoplay=1&loop=1&byline=0&title=0'}`}
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      className="absolute top-0 left-0 object-contain w-full h-full"
    />
  </div>
);

export default VideoIframe;
