import {getResource} from './getresource.js'
import {url} from './source.js';
import {url1} from './source.js';

export default function renderPage(domContent, id) {
      let currentTime;
  
      domContent.innerHTML = "";
      domContent.innerHTML += `
    <div>
      <button class="go-to-main">Go to main...</button>
      <h3 class="page-description"></h3>
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

/*         video.addEventListener("error",(e)=>{
          console.log("error   ", e);
        }); */
        
        video.addEventListener("pause",(e)=>{
          console.log("pause   ", e.target.currentTime);
          currentTime=e.target.currentTime;
          console.log(currentTime);
          localStorage.setItem(id,currentTime);
        });

/*         lessonListHtml.addEventListener("click",(e)=>{
          e.preventDefault();
          let target = e.target;
          if(target.getAttribute("class")==="unlocked"){
            target.innerHTML=`
              <div class="lesson-wrap">
                <video id=${target.getAttribute("id")} class="video-lesson" controls></video>
              </div>
            `;
          }

        const video1 = document.getElementById(target.getAttribute("id"));
        const videoSrc = data.lessons[target.getAttribute("id")].link;
        console.log(videoSrc);
        if (Hls.isSupported()) {
            const start = 0;//+localStorage.getItem(id);
            const hls = new Hls({capLevelToPlayerSize:true,
              startPosition:start});
            hls.loadSource(videoSrc);
            hls.attachMedia(video1);
            video1.play();
        }
        else if (video1.canPlayType('application/vnd.apple.mpegurl')) {
            video1.src = videoSrc;
        }  


        }); *///lessonList

      });//getResource(url1,urlId)
  }




