document.addEventListener("DOMContentLoaded", function () {
  const moonIcon = document.querySelector(".fa-moon");
  const sunIcon = document.querySelector(".fa-sun");

  const toggleElements = [
      document.body,
      document.querySelector(".navbar"),
      document.querySelector(".footer"),
      document.querySelector("section"),
  ];

  function toggleLightMode() {
      toggleElements.forEach((element) => {
          if (element) {
              element.classList.toggle("light-mode");
          }
      });

      if (document.body.classList.contains("light-mode")) {
          moonIcon.style.display = "none";
          sunIcon.style.display = "inline-block";
      } else {
          moonIcon.style.display = "inline-block";
          sunIcon.style.display = "none";
      }
  }

  moonIcon.addEventListener("click", toggleLightMode);
  sunIcon.addEventListener("click", toggleLightMode);

  document.querySelectorAll('td').forEach(td => {
      const skillLevel = td.getAttribute('data-skill');
      const loaderCircle = document.createElement('div');
      loaderCircle.classList.add('loader-circle');
      loaderCircle.style.setProperty('--skill-level', skillLevel);
      loaderCircle.style.setProperty('--loader-color', '#2d1d83');
      loaderCircle.textContent = `${skillLevel}%`;
      td.appendChild(loaderCircle);
  });

  document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message!');
  });

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const certificateSection = document.querySelector('.certificate-section');
  let currentIndex = 0;
  let itemsToShow = calculateItemsToShow();
  const totalItems = document.querySelectorAll('.certificate').length;
  const totalSlides = Math.ceil(totalItems / itemsToShow);

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateCarousel();
      }
  });

  function updateCarousel() {
      const translateX = -currentIndex * (100 / itemsToShow) * itemsToShow;
      certificateSection.style.transform = `translateX(${translateX}%)`;
  }

  function calculateItemsToShow() {
      if (window.innerWidth <= 480) {
          return 1;
      } else if (window.innerWidth <= 768) {
          return 2;
      } else {
          return 5;
      }
  }

  window.addEventListener('resize', () => {
      itemsToShow = calculateItemsToShow();
      currentIndex = 0;  
      updateCarousel();
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const largeVideo = document.getElementById('largeVideo');
    const closeBtn = document.querySelector('.close-btn');
    const projectVideos = document.querySelectorAll('.project-video');

    projectVideos.forEach(video => {
        video.addEventListener('click', () => {
            const videoSrc = video.getAttribute('data-video-src');
            largeVideo.src = videoSrc;
            videoModal.style.display = 'block';
            largeVideo.play();
        });
    });

    closeBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        largeVideo.pause();
        largeVideo.currentTime = 0;
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            largeVideo.pause();
            largeVideo.currentTime = 0;
        }
    });
});


