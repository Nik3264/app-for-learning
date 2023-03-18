import {courseList} from './src/source.js';
import {courseId} from './src/source.js';
import renderCard from './src/card.js';
import renderPage from './src/page.js';

//I have got the object from request and use it here,
//becouse not all browsers works with this API

const url =  'https://api.wisey.app/api/v1/core/preview-courses';//"http://api.wisey.app/api/v1/core/preview-courses";
const url1 = "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions";

const getResource = async (url) => {
    const res = await fetch(url);
    return await res.json();
  };

getResource(url1).then((data)=>{
  let token=data.token;
  console.log(token);
  fetch(url,{
    method: "GET",
    headers:{
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  }).then((response)=>{
    console.log(response);
    return response;
  })
  .catch(()=>{console.log('erRor')});
});


const content = document.querySelector(".content");
//let dataImg=courseList.courses[1].previewImageLink+'/cover.webp';
//console.log(dataImg);
let courses=courseList.courses;
let cardCount=9;
renderCard(courses, content, cardCount);

content.addEventListener('click',(e)=>{
    e.preventDefault();
    let target = e.target;
    let idClicked;
    while (target.getAttribute("class") != "course-wrap" 
    && target.getAttribute("class") != "content"
    && target.getAttribute("class") != "go-to-main"
    && target.getAttribute("class") != "button-more") {
        target = target.parentNode;
     } //while

    if (target.getAttribute("class") === "course-wrap"){
        idClicked=target.getAttribute("id");
        renderPage(content);
        //window.location.href="page.html";
    }
    if (target.getAttribute("class") === "go-to-main"){
        renderCard(courses, content,cardCount);
    }

    if (target.getAttribute("class") === "button-more"){
      cardCount+=9;
      console.log(cardCount);
      renderCard(courses, content,cardCount);
    }
    
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

