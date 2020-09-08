import images from './gallery-items.js';

let currentId = 0;
const ulRef = document.querySelector('.js-gallery');
const overlayRef = document.querySelector('.lightbox__content');
const overRef = document.querySelector('.lightbox');
const imgOverRef = document.querySelector('.lightbox__image');
const closeBtn = overRef.querySelector('button[data-action="close-lightbox"]');

const createLi = (image, index) => {
  const ref = {
      ul: document.querySelector('.js-gallery'),
      li: document.createElement('li'),
      a: document.createElement('a'),
      img: document.createElement('img'),
  }
  ref.li.classList.add('gallery__item');
  ref.a.classList.add('gallery__link');
  ref.a.href = image.original;
  ref.img.classList.add('gallery__image');
  ref.img.src = image.preview;
  ref.img.setAttribute('data-source', image.original);
  ref.img.setAttribute('data-index', index);
  ref.img.alt = image.description;
  ref.a.appendChild(ref.img);
  ref.li.appendChild(ref.a);
  return ref.li;
};
const arrLi = images.map((image, index) => createLi(image, index));
ulRef.append(...arrLi);

const openModal = () => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  overRef.classList.add('is-open');
  imgOverRef.src = event.target.dataset.source;
  currentId = Number(event.target.dataset.index);
  window.addEventListener('keydown', onKeyPress);
}
const closeModal = () => {
  overRef.classList.remove('is-open');
  imgOverRef.src = '';
  window.removeEventListener('keydown', onKeyPress);
}
const prevImage = () => {
  if (currentId > 0 && currentId <= images.length-1) {
    currentId -= 1;
    imgOverRef.src = images[currentId].original;
  } else if (currentId === 0) {
    currentId = images.length-1;
    imgOverRef.src = images[currentId].original;
  }
}
const nextImage = () => {
  if (currentId >= 0 && currentId < images.length-1) {
    currentId += 1;
    imgOverRef.src = images[currentId].original;
  } else if (currentId = images.length-1) {
    currentId = 0;
    imgOverRef.src = images[currentId].original;
  }

}
const onKeyPress = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
  if (event.code === 'ArrowLeft') {
    prevImage();
  }
  if (event.code === 'ArrowRight' || event.code === 'Space') {
    nextImage();
  }
}
const onBackClick = event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

ulRef.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlayRef.addEventListener('click', onBackClick);