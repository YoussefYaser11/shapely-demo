const sliderContent = [
    {
      content: 'imgs/img-1.jpg',
    },
    {
      content: 'imgs/img-2.jpg',
    },
    {
      content: 'imgs/img-3.jpg',
    },
    {
      content: 'imgs/img-4.jpg',
    },
    {
      content:
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      content:
        'https://images.unsplash.com/photo-1541727687969-ce40493cd847?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  
  const sliderWrapper = document.querySelector('.slider');
  const sliderContainer = document.querySelector('.slider__items');
  const dotsContainer = document.querySelector('.dots-container');
  
  let currSlide = 1;
  let maxSlide = sliderContent.length;
  
  function initalizeSliderItems() {
    sliderContent.forEach((content) => {
      const html = `
      <div class="slider__item">
      <img src="${content.content}" alt="asdfhk" />
      </div>
      `;
      sliderContainer.insertAdjacentHTML('beforeend', html);
    });
  }
  initalizeSliderItems();
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'slider__btn slider__btn--next';
  nextBtn.innerHTML = `<i class="fa-solid fa-forward"></i>`;
  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider__btn slider__btn--prev';
  prevBtn.innerHTML = '<i class="fa-solid fa-backward"></i>';
  
  sliderWrapper.appendChild(prevBtn);
  sliderWrapper.appendChild(nextBtn);
  const imgs = document.querySelectorAll('.slider__item');
  
  function initSlider() {
    createDots();
    moveSlide(1);
  }
  function moveSlide(currSlide) {
    // console.log(imgs);
    imgs.forEach((img, index) => {
      img.style.transform = `translateX(${100 * (index - (currSlide - 1))}%)`;
    });
    handleActiveDot();
  }
  
  function nextSlideHandler() {
    if (currSlide === maxSlide) {
      currSlide = 1;
      moveSlide(1);
    } else {
      currSlide++;
      moveSlide(currSlide);
    }
  }
  
  function prevSlideHandler() {
    if (currSlide === 1) {
      currSlide = maxSlide;
      moveSlide(currSlide);
    } else {
      currSlide--;
      moveSlide(currSlide);
    }
  }
  
  function createDots() {
    sliderContent.forEach((_, index) => {
      const html = `
        <span data-slide=${index + 1} class='slider-dot'></span>
      `;
      dotsContainer.insertAdjacentHTML('beforeend', html);
    });
  }
  
  function handleActiveDot() {
    document
      .querySelectorAll('.slider-dot')
      .forEach((dot) => dot.classList.remove('slider-dot--active'));
    document
      .querySelector(`[data-slide='${currSlide}']`)
      .classList.add('slider-dot--active');
  }
  
  function handleDotsEvent(e) {
    const dot = e.target;
    if (!dot.closest('.slider-dot')) return;
    const { slide } = dot.dataset;
    currSlide = +slide;
    moveSlide(currSlide);
  }
  
  initSlider();
  
  nextBtn.addEventListener('click', nextSlideHandler);
  prevBtn.addEventListener('click', prevSlideHandler);
  
  dotsContainer.addEventListener('click', handleDotsEvent);
  