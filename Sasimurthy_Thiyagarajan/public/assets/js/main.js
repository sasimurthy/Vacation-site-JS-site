
// Initializing the AOS feature(Animate On Scroll)
AOS.init({
    duration: 1200, // setting the Animation duration
    once: true, // Animation runing once
  });
  
  // Initialize Granim.js (Gradient Background) feature
  const granimInstance = new Granim({
    element: '#gradient-canvas',
    direction: 'left-right',
    opacity: [1, 0.6],
    states: {
      "default-state": {
        gradients: [
          ['#FFB6C1', '#FF69B4'],
          ['#D2691E', '#8B4513'],
          ['#4169E1', '#00BFFF'],
          ['#32CD32', '#228B22']
        ]
      }
    }
  });
  
  // Initializing the  Glide.js with autoplay feature
  new Glide('.glide', {
    type: 'carousel',
    perView: 3, // Adjusting the number of visible slides
    focusAt: 'center',
    gap: 20, // Spacing between slides
    autoplay: 3000, // Autoplay interval (in milliseconds) format
    hoverpause: true, // Pausing the autoplay on hover
    animationDuration: 1000, 
    animationTimingFunc: 'ease-in-out', // Animation easing function
  }).mount();
  
  // Function to create the chart
  function createChart() {
    // Ensuring the canvas element exists
    var ctx = document.getElementById('myChart').getContext('2d');
    if (!ctx) {
      console.error("Canvas element not found!");
      return;
    }
  
    // Creating the  gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.8)');
  
    // Creating the chart
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Paris', 'Tokyo', 'New York', 'Rome', 'Sydney', 'Dubai'],
        datasets: [{
          label: 'Bookings (in thousands)',
          data: [30, 40, 35, 50, 45, 60],
          backgroundColor: gradient,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
          hoverBorderColor: 'rgba(255, 159, 64, 1)',
          hoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Bookings (Thousands)',
              font: {
                size: 16, // Increasing the size of the Y-axis label
                weight: 'bold',
                family: 'Arial'
              }
            },
            ticks: {
              font: {
                size: 14, 
                family: 'Arial'
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Travel Destinations',
              font: {
                size: 16, // Increase the size of the X-axis label in the chart
                weight: 'bold',
                family: 'Arial'
              }
            },
            ticks: {
              font: {
                size: 14, 
                family: 'Arial'
              }
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutBounce',
          onComplete: function () {
            console.log('Chart animation complete!');
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 5,
            titleFont: {
              size: 16 
            },
            bodyFont: {
              size: 14 
            }
          }
        }
      }
    });
  }
  
  // Initializing the  map function
  function initializeMap() {
    // Create map
    var map = L.map('map').setView([51.505, -0.09], 13); // Initial view  with [lat, lng], zoom level
  

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);
  
    // Add a marker
    var marker = L.marker([51.505, -0.09]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  
    // Add a circle
    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
    circle.bindPopup("I am a circle.");
  }
  
  // Call the function to create the chart and initialiing the map once the DOM is fully loaded
  window.onload = function () {
    createChart();
    initializeMap(); 
  };
  

// Creating the lightbox div element 
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Creating the close button and append it to the lightbox function
const closeBtn = document.createElement('span');
closeBtn.id = 'close-btn';
closeBtn.innerHTML = '×';
lightbox.appendChild(closeBtn);

// Creating the previous and next buttons
const prevBtn = document.createElement('button');
prevBtn.id = 'prev-btn';
prevBtn.innerHTML = '&#10094;';
lightbox.appendChild(prevBtn);

const nextBtn = document.createElement('button');
nextBtn.id = 'next-btn';
nextBtn.innerHTML = '&#10095;';
lightbox.appendChild(nextBtn);

// Creating an img element for the lightbox image
const lightboxImg = document.createElement('img');
lightboxImg.id = 'lightbox-img';
lightbox.appendChild(lightboxImg);

// Storing the images in a variable
const images = document.querySelectorAll('.gallery-item');
let currentIndex = -1;

// Function to open the lightbox with the selected image
function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('active');
    lightboxImg.src = images[currentIndex].src;
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
    lightboxImg.src = images[currentIndex].src;
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    lightboxImg.src = images[currentIndex].src;
}

// Adding the click event to each image in the gallery option to open the lightbox
images.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
});

// Closing the lightbox when the close button is clicked
closeBtn.addEventListener('click', closeLightbox);

// Changing the image when the next button is clicked
nextBtn.addEventListener('click', nextImage);

// Changing the image when the previous button is clicked
prevBtn.addEventListener('click', prevImage);

// Close the lightbox when clicking outside of the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});


// Initialize the AOS function
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000, // setting the Animation duration in milliseconds
    easing: 'ease-in-out', 
    once: false, //  repeating the animation
    offset: 100, // Start animation when element is 100px in the viewport
  });

  // Re-trigger AOS animations on hover
  document.querySelectorAll('[data-aos]').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.classList.remove('aos-animate'); // Remove current animation state
      setTimeout(() => {
        element.classList.add('aos-animate'); // Reapply animation
      }, 50); // Small delay to allow class to reset
    });
  });
});



 // Initialize Cleave.js for credit card input data
 var cleaveCard = new Cleave('#card-input', {
  creditCard: true,
  onCreditCardTypeChanged: function (type) {
    console.log("Detected Card Type: " + type); 
  }
});

// Initialize Cleave.js for date input
var cleaveDate = new Cleave('#date-input', {
  date: true,
  datePattern: ['m', 'd', 'Y'], // Format: MM/DD/YYYY
  onValueChanged: function (e) {

    console.log("Formatted Date: " + e.target.value);
    
    // Updating the displayed formatted date
    document.getElementById('date-value').textContent = e.target.value;
  }
});

// Initialize Cleave.js for time input (hh:mm:ss format)
var cleaveTime = new Cleave('#time-input', {
  time: true,
  timePattern: ['h', 'm', 's']  // Defing the time format: hours, minutes, seconds
});