export default function renderPage(domContent) {
      domContent.innerHTML = "";
      
      domContent.innerHTML += `
    <div>
      <button class="go-to-main">Go to main...</button>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
      <video id="video"></video>
    </div>
      `;   

      const video = document.getElementById('video');
      const videoSrc = 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8';
      if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
      }
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
      }       
  }




