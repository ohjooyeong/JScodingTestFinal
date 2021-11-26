(function () {
  const carouselUI = document.querySelector(".carousel-list");
  const imageInput = document.querySelector("#image-upload-input");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  function moveNext() {
    const items = document.querySelectorAll(".carousel-item");

    if (items.length > 1) {
      const currentItem = document.querySelector(".now");
      const next = currentItem.nextElementSibling;
      carouselUI.appendChild(currentItem);
      currentItem.classList.remove("now");
      next.classList.add("now");
    }
  }

  function movePrev() {}

  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);
})();
