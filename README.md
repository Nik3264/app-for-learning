# app-for-learning
[Demo](https://nik3264.github.io/app-for-learning/)

### Work on the project:
1. Get data about the list of all courses in the form of an array
(*due to a CORS error, it was not possible to move further, in the end I hardcoded the data received from Postman, and only on the eve of the deadline it was still possible to reach the server through the installed CORS extension in the browser*)

2. Render the course cards by looping  through the array (*thereby already having access to all the information about the course according to the invented design*). The **renderCard(listCard, domContent, count)** function accepts a data array, a DOM element, where to render the data, and the count variable, which is responsible for pagination (*namely, it is equal to 10, and when you click "Show more", it increases by 10*). Using the **slice(0, count)** method, I get the required amount of data.

3. When clicking on a course, open (render) a window with the given course ID. For this, the **renderPage(domContent, id)** component is passed as a parameter the DOM element where to render the data and the id variable of the specific course to be rendered. For this, a request is made to the server with the given **id** to receive data. The page displays information about the course, the number of lessons (*unlocked ones are distinguished by color and clickability*), as well as a video of the course. When watching a video, timing information is stored in **LocalStorage**. You can then resume viewing from where you left off. When clicking on a clickable (*pun intended*) lesson, the video of the lesson should be displayed (perhaps in a separate modal window, or perhaps on the page, there is not enough time for design). But no video from the lessons is displayed, although I get a completely valid url in the console. Therefore, I will leave this implementation due to lack of time. But I will definitely come back, because working with videos is quite interesting, I want to figure it out...

**4. Despite all the obstacles, I really liked the project, I want to continue working on it. I will be glad to receive feedback, learn about the main shortcomings and advice on improvement.**

