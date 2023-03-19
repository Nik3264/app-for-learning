import {courseList} from './src/source.js';
import {courseId} from './src/source.js';
import {url} from './src/source.js';
import {url1} from './src/source.js';
import renderCard from './src/card.js';
import renderPage from './src/page.js';
import {getResource} from './src/getresource.js'

//I have got the object from request and use it here,
//becouse not all browsers works with this API

/* const url =  'https://api.wisey.app/api/v1/core/preview-courses';
const url1 = "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions"; */
const urlId=url+'/3b77ceb6-fb43-4cf5-a25b-8fe9222a0714';

let arr;

/* const getResource = async (url) => {
    const res = await fetch(url);
    return await res.json();
  };

const getResUrl = async (urlAuth, urlRes) => {
  return await getResource(urlAuth).then(data=>{
  let token=data.token;
  console.log(token);
  fetch(urlRes,{
    method: "GET",
    headers:{
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  }).then((response)=>{
    return response.json();
  }).then(data=>{
    console.log('data  ',data);
    return data;
  })
  .catch(()=>console.log('erRor'));
  });
}; */

/* getResUrl(url1,url).then(data=>{
  arr =  data;
  console.log('arr  ',arr);
}); */

/* const getResource = async (urlAuth, url) => {
  let res = await fetch(urlAuth);
  let token = await res.json();

  let resData = await fetch(url,{
    method: "GET",
    headers:{
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token.token}`
    }
  });
  let data = await resData.json();
  console.log(data);
  return data;
}; */

getResource(url1,url).then((data)=>{
  console.log('then data  ',data);

  const content = document.querySelector(".content");
  //let dataImg=courseList.courses[1].previewImageLink+'/cover.webp';
  //console.log(dataImg);
  let courses=data.courses;
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
          const h1=document.querySelector('.h1');
          h1.innerHTML=courses[idClicked].title;
          renderPage(content,courses[idClicked]['id']);
          //window.location.href="page.html";
      }
      if (target.getAttribute("class") === "go-to-main"){
        const h1=document.querySelector('.h1');
        h1.innerHTML=`Look, there's something for you here...`;
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
});//getResource(url1,url)




