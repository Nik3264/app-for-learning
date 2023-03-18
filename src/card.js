export default function renderCard(listCard, domContent, count) {
    domContent.innerHTML = "";
    const listCardCount=listCard.slice(0,count);
    listCardCount.forEach((course, id) => {
      domContent.innerHTML += `
        <div id=${id} class="course-wrap">
            <header class="course-header">
                <h3>${course.title}</h3>
            </header>
            <img class="course-img" src="${course.previewImageLink+'/cover.webp'}" alt="">
            <p class="course-description">${course.description}</p>
            <a href="#" class="course-email">${course.duration}</a>
            <a href="#" class="course-tel">${course.lessonsCount}</a>
            <footer class="course-gender">
                <h4>course.meta.courseVideoPreview.link</h4>
            </footer>
        </div>
      `;
    });

    if(count<listCard.length){
      domContent.innerHTML += `
      <button class="button-more">Load More...</button>
      `;
    }

  }