
import { cdnUrl, projectID } from './env.js';
import { handleImage, handleImageStyle } from './utils.js';
import { handleParagraphs } from './utils.js';

function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')
    
    if(pageValue === null) {
        getPosts(); 
    } else {
        getPost(pageValue);
    }
}

async function getPost(pageValue) {

  
    console.log(projectID);
    console.log(pageValue);
    const project = document.querySelector('.body-text');
    const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);
    const { result } = await post.json();
    console.log(result[0]);
    const projectTitle = document.querySelector('.heading');
    projectTitle.innerText = result[0].title
    const cover = document.querySelector('.main-image');
    cover.setAttribute('style',`background-image: url('${handleImageStyle (result[0].mainImage.asset._ref)}')`);
    console.log(project);
    project.append(handleParagraphs(result[0].body));

}

async function getPosts() {

  const posts =  await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
  [_type == "post"]
  `);

  const { result } = await posts.json();

  


  const worksList = document.querySelector('.workslist');



  console.log(result)
  result.forEach(post => {   
      const workBlock = document.createElement('a');
      workBlock.classList.add('item'); 
      workBlock.setAttribute(
          'href', 
          `./project.html?page=${post.slug.current}`
      ); 
      workBlock.setAttribute('aria-label', post.title);
      console.log(post.mainImage.asset._ref)
      workBlock.setAttribute('style', `background-image: url('${handleImageStyle (post.mainImage.asset._ref)}')`,)
      const workCover = document.createElement('img');
      const cover = post.mainImage.asset._ref.split('3'); 
      workCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
      worksList.append(workBlock); 
  });
}
init();



