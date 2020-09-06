import images from './gallery-items.js';

const ulRef = document.querySelector('.js-gallery');
const overlayRef = document.querySelector('.lightbox__content');
const overRef = document.querySelector('.lightbox');
const imgOverRef = document.querySelector('.lightbox__image');
const closeBtn = overRef.querySelector('button[data-action="close-lightbox"]');

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
  return ref.li;
};
const arrLi = images.map(image => createLi(image));
ulRef.append(...arrLi);

const openModal = () => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {  
    return;
  }
  overRef.classList.add('is-open');
  imgOverRef.src = event.target.alt;
  window.addEventListener('keydown', escCloseModal); // - чи є різниця в якому місці зареєстрований слухач? 
  window.addEventListener('keydown', onNextImage);   // - куди краще повісити? чи треба знімати?
}
const closeModal = () => {
  overRef.classList.remove('is-open');
  imgOverRef.src = '';
  window.removeEventListener('keydown', escCloseModal);
}
const escCloseModal = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
}                                   // - чому після Ескейпа доводиться клікати на імедж двічі?
const onBackClick = event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

ulRef.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal);
overlayRef.addEventListener('click', onBackClick);

// Пролистывание изображений галереи в открытом модальном окне 
// клавишами "влево" и "вправо".

// const onNextImage = event => {
//   console.log(event.code);
//   for (let i=0; i<images.length; ) {

//     if (event.code === 'ArrowLeft') {
//       imgOverRef.src = images[i-1].alt;
//       // if (event.code === 'ArrowRight') {
//         // imgOverRef.src = images[i+1].alt;
//         //   closeModal();
//       }
//   }
// }