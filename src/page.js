import {getResource} from './getresource.js'
import {url} from './source.js';
import {url1} from './source.js';

export default function renderPage(domContent, id) {
      let currentTime;

      const btnMain=document.querySelector('.go-to-main');
      btnMain.classList.remove('btn-up_hide');

      domContent.innerHTML = "";
      domContent.innerHTML += `
    <div>
      <h2 class="page-description"></h2>
      <p class="locked-lessons"></p>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
      <ol class="lessons-list"><p>Loading...</p>
      </ol>
      <video id="video" class="video-lesson" controls></video>
    </div>
      `;   
      const urlId=url+'/'+id;

      getResource(url1,urlId).then((data)=>{
        console.log('then data id link ',data.meta.courseVideoPreview.link);
        document.querySelector('.page-description').innerText = data.description;
        document.querySelector('.locked-lessons').innerText = data.containsLockedLessons ? 'Contains locked lessons: Yes' : 'Contains locked lessons: No';

        let lessons=data.lessons.map((lesson,i)=>{
          let src=lesson.previewImageLink+'/lesson-'+(i+1)+'.webp';
          return `<li id=${i} class=${lesson.status}>
            ${lesson.title}
            : ${lesson.status}
          </li>`
        }).join('');
        const lessonListHtml = document.querySelector('.lessons-list');
        lessonListHtml.innerHTML = lessons;
        const video = document.getElementById('video');
        const videoSrc = data.meta.courseVideoPreview.link;

        if (Hls.isSupported()) {
            const start = +localStorage.getItem(id);
            const hls = new Hls({capLevelToPlayerSize:true,
              startPosition:start});
            hls.loadSource(videoSrc);
            hls.attachMedia(video);

        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
        }  
        
        video.addEventListener("pause",(e)=>{
          console.log("pause   ", e.target.currentTime);
          currentTime=e.target.currentTime;
          console.log(currentTime);
          localStorage.setItem(id,currentTime);
        });
      });//getResource(url1,urlId)
  }
