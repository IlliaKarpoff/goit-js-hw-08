import images from './gallery-items.js';
// console.log(images);
const ulRef = document.querySelector('.js-gallery');
const createLi = image => {
  const ref = {
      ul: document.querySelector('.js-gallery'),
      li: document.createElement('li'),
      a: document.createElement('a'),
      img: document.createElement('img'),
      // img: document.createElement('img[data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"]'),
  }
  ref.li.classList.add('gallery__item');
  ref.a.classList.add('gallery__link');
  ref.a.href = image.original;
  ref.img.classList.add('gallery__image');
  ref.img.src = image.preview;
  ref.img.alt = image.original;
  ref.img.description = image.description;
  // const data = data-source;                     // ???   // 'button[data-action="render"]'
  ref.a.appendChild(ref.img);
  ref.li.appendChild(ref.a);
  // console.log(ref.li);
  return ref.li;
};
const arrLi = images.map(image => createLi(image));
// console.log(arrLi);
ulRef.append(...arrLi);
// console.log(ulRef);

const overRef = document.querySelector('.lightbox');
const imgOverRef = document.querySelector('.lightbox__image');
const closeBtn = overRef.querySelector('button[data-action="close-lightbox"]');
// console.log(closeBtn);

const closeModal = () => {
  overRef.classList.remove('is-open');
  imgOverRef.src = '';
}
const clickHandler = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {  
    return;
  }
  console.log(event.target);
  console.log(event.target.alt);
  overRef.classList.add('is-open');
  imgOverRef.src = event.target.alt;
  closeBtn.addEventListener('click', closeModal);
}
ulRef.addEventListener('click', clickHandler)
