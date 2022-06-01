import {cdnUrl} from "./env.js";


export function handleImage(keyImage, customClass = 'basic-image') {

    const imageArray = keyImage.split('-');
    const image = document.createElement('img');
    image.classList.add(customClass);
    image.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    return image;
    
}


  

export function handleImageStyle(keyImage) {

    const imageArray = keyImage.split('-');

    
    return  (`${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
}

export function handleParagraphs(body) {
    const text = document.createElement('article');
    if (body) {
        body.map(p => {
            if(p._type === 'block') {
                if(p.style === 'h2') {
                    const newp = document.createElement('h2');
                    newp.innerText = p.children[0].text;
                    text.append(newp); 
                }
                if(p.style === 'normal') {
                    const newp = document.createElement('p');
                    newp.innerText = p.children[0].text;
                    text.append(newp); 
                }
            }
            if(p._type === 'image') {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container-article');
                imgContainer.append(handleImage(p.asset._ref));
                text.append(imgContainer);
            }
        })
    };
    return text;
}

