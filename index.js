import {courseList} from './src/source.js';
import {courseId} from './src/source.js';
import {url} from './src/source.js';
import {url1} from './src/source.js';
import renderCard from './src/card.js';
import renderPage from './src/page.js';
import {getResource} from './src/getresource.js'

//I have got the object from request and use it here,
//becouse not all browsers works with this API

getResource(url1,url).then((data)=>{
  console.log('then data  ',data);

  const content = document.querySelector(".content");
  let courses=data.courses;
  let cardCount=9;
  renderCard(courses, content, cardCount);

  content.addEventListener('click',(e)=>{
      e.preventDefault();
      let target = e.target;
      let idClicked;
      while (target.getAttribute("class") != "course-wrap" 
      && target.getAttribute("class") != "content"
      && target.getAttribute("class") != "button-more") {
          target = target.parentNode;
      } //while

      if (target.getAttribute("class") === "course-wrap"){
          idClicked=target.getAttribute("id");
          const h1=document.querySelector('.h1');
          h1.innerHTML=courses[idClicked].title;
          renderPage(content,courses[idClicked]['id']);
          //window.location.href="page.html";
      }

      if (target.getAttribute("class") === "button-more"){
        cardCount+=9;
        console.log(cardCount);
        renderCard(courses, content,cardCount);
      }
  });

  const btnMain=document.querySelector('.go-to-main');
  btnMain.addEventListener("click",()=>{
    const h1=document.querySelector('.h1');
    btnMain.classList.add('btn-up_hide');
    h1.innerHTML=`Look, there's something for you here...`;
    renderCard(courses, content,cardCount);
  });

  //button up
  const btnUp=document.querySelector('.btn-up');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    scrollY > 400 ? btnUp.classList.remove("btn-up_hide") : btnUp.classList.add("btn-up_hide");
  });

  btnUp.onclick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
});//getResource(url1,url)
