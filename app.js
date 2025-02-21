const openBtn = document.getElementById("openBtn");
const sideBar = document.querySelector(".sidebar");
const closeMenu = document.getElementById("closeMenu");
const applyOverlay = document.querySelector(".overlay");
const cartIcon = document.querySelectorAll(".cart");
const cart = document.getElementById("cart-list");

const sliderContainer = document.querySelector(".slider-container"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll(".images"),
  buttons = document.querySelectorAll(".arrow");

let imageIndex = 1,
  intervalId;

let cartDisplay = false;

openBtn.addEventListener("click", () => {
  sideBar.classList.toggle("openSidebar");
  applyOverlay.classList.toggle("applyOverlay");
});

closeMenu.addEventListener("click", () => {
  sideBar.classList.remove("openSidebar");
  applyOverlay.classList.remove("applyOverlay");
});

// Defines the function to start the slide automatically
const autoSlide = () => {
  // start the slide show by calling slide image every 2 seconds.
  intervalId = setInterval(() => slideImage(++imageIndex), 6000);
};

// Call autoslide on page load
autoSlide();
// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the Updated Image Index
  imageIndex =
    imageIndex === images.length
      ? 0
      : imageIndex < 0
      ? images.length - 1
      : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

// Function that updates the next or previous image
const updateClick = (e) => {
  // Stop the sutomatec slideshow
  clearInterval(intervalId);
  // Calculate the updated image and use the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  autoSlide();
};

//  Eventlistener for the navigation button
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add a mouseover event to the slide container to stop the slider
sliderContainer.addEventListener("mouseover", () => {
  clearInterval(intervalId);
});

// Keep Slidingafter Mouse leaves
sliderContainer.addEventListener("mouseleave", autoSlide);

// Display Cart when Cart Icon is clicked

cartIcon.forEach((cartbutton) => {
  cartbutton.addEventListener("click", () => {
    cartDisplay = !cartDisplay;

    if (cart.classList.contains("show")) {
      cart.classList.remove("show");
    } else {
      cart.classList.add("show");
      setTimeout(() => {
        cart.style.display = "block";
      }, 0);
    }
  });
});

// Desketop Product Overview
const thumbnails = document.getElementsByClassName("thumbnail");
const activeImages = document.getElementsByClassName("active");

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", () => {
    if (activeImages > 0) {
      activeImages[0].classList.remove("active");
    }

    for (let j = 0; j < thumbnails.length; j++) {
      thumbnails[j].classList.remove("activeThumbnail");
    }

    thumbnails[i].classList.add("active");
    thumbnails[i].classList.add("activeThumbnail");
    document.getElementById("featured").src = thumbnails[i].src;
  });
}

// Overlay Image Display
const featuredImage = document.getElementById("overlay-featured");
const thumbnailsOverlay = document.querySelectorAll(".thumbnails .thumbnail");
const rightNav = document.querySelector(".right-nav");
const leftNav = document.querySelector(".left-nav");

let currentIndex = 0;

// Function to update the featured image
const updateFeaturedImage = (index) => {
  thumbnailsOverlay.forEach((thumbnail, idx) => {
    thumbnail.classList.toggle("overlay-active", idx === index);
  });
  featuredImage.src = thumbnailsOverlay[index].src;
};

// Right navigation
rightNav.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % thumbnailsOverlay.length;
  updateFeaturedImage(currentIndex);
});

// Left navigation
leftNav.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + thumbnailsOverlay.length) % thumbnailsOverlay.length;
  updateFeaturedImage(currentIndex);
});

// Thumbnail click event
thumbnailsOverlay.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentIndex = index;
    updateFeaturedImage(currentIndex);
  });
});

// Exit Overlay Product Display
const exitIcon = document.querySelector(".exit-icon");
const overlayDisplay = document.querySelector(".overlay-product-display");

exitIcon.addEventListener("click", () => {
  overlayDisplay.classList.toggle("revealOverlay");
});

// Open Overlay Product Display
const desktopFeaturedImage = document.getElementById("featured");

desktopFeaturedImage.addEventListener("click", () => {
  if (overlayDisplay) {
    overlayDisplay.classList.add("revealOverlay");
  }
});

// Add or Subtracting the Number of Product to be Bought...
const addProduct = document.getElementById("add");
const subtractProduct = document.getElementById("minus");
const productQuantity = document.getElementById("quantity");

let initialVal = 0;

const addValFunc = () => {
  const newVal = (initialVal += 1);

  productQuantity.innerHTML = newVal;
  productQuantity.value = productQuantity.innerHTML;
};

addProduct.addEventListener("click", () => {
  addValFunc();
});

const subValFunc = () => {
  if (initialVal > 0) {
    const newVal = (initialVal -= 1);

    productQuantity.innerHTML = newVal;
    productQuantity.value = productQuantity.innerHTML;
  } else {
    productQuantity.innerHTML = 0;
    productQuantity.value = productQuantity.innerHTML;
  }
};

subtractProduct.addEventListener("click", () => {
  subValFunc();
});

// Add to Cart Function
const addToCart = document.getElementById("button");
const productInCart = document.getElementById("number-of-product");
const totalAmount = document.getElementById("amount");
const cartItems = document.getElementById("items-in-cart");
const cartItems2 = document.getElementById("items-in-cart-2");
const deleteProducts = document.getElementById("delete-product");

addToCart.addEventListener("click", () => {
  productInCart.innerHTML = productQuantity.value;
  cartItems.innerHTML = productQuantity.value;
  cartItems2.innerHTML = productQuantity.value;

  const totalCost = 125 * productQuantity.value;
  totalAmount.innerHTML = `$${totalCost}`;
});

deleteProducts.addEventListener("click", () => {
  productInCart.innerHTML = 0;
  productQuantity.innerHTML = 0;
  cartItems.innerHTML = 0;
  cartItems2.innerHTML = 0;
  totalAmount.innerHTML = 0;
});
