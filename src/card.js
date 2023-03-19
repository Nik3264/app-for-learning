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
            <ul class="course-skills">${course.meta.skills.map((skill)=>{
              return `<li>${skill}</li>
              `;
            }).join('')}</ul>            
            <footer class="course-footer">
              <div class="topic ${course.tags}">${course.tags}</div>
              <div class="rating">[${course.rating}]</div>
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