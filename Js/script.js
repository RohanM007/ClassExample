//Feature 1 Accordion functionality

//Select all the buttons with the acc class
const accordionButtons = document.querySelectorAll(".accordion");

//Loop through each accordion button
accordionButtons.forEach((button) => {

    //add a click event listener to each button
    button.addEventListener("click", () => {

        //toggle the active class on the clicked button
        button.classList.toggle("active");

        //find the panel directly after the button
        const panel = button.nextElementSibling;

        //expand or collapse the panel
        panel.classList.toggle("open");

        //update whether the section is expanded
        button.setAttribute("aria-expanded", panel.classList.contains("open")
        );
    });
});

//Feature 2: Search functionality

//Select the search input field
const searchInput = document.getElementById("searchInput");

//Select all the destination cards
const destinationCards = document.querySelectorAll(".destination-card");

//Select the no results message
const noResults = document.getElementById("noResults");

//run the code whenever the user types
searchInput.addEventListener("input", () => {

    //Get the search text and covert it to lowercase
    const searchText = searchInput.value.toLowerCase().trim();

    //count how many destinaions match the search
    let matchCount = 0;

    //loop through every destination card
    destinationCards.forEach((card) => {

        //get the destination name
        const destinationName = card.querySelector("h3").textContent.toLowerCase();

        //Get province name
        const provinceName = card.querySelector(".province").textContent.toLocaleLowerCase();

        //Check whether the search matches the name or province
        if (destinationName.includes(searchText) || provinceName.includes(searchText)) {

            //Display matching cards
            card.hidden = false;

            //incerease matching count
            matchCount++;

        } else {

            //hide the cards that do not match
            card.hidden = true;
        }
    });

    //Shows a message when there are no matches
    noResults.hidden = matchCount !== 0;
});

//Feature 3: Lightbox

// Select all gallery images
const galleryImages = document.querySelectorAll(".gallery-image");

// Select the lightbox background
const lightbox = document.getElementById("lightbox");

// Select the enlarged image element
const lightboxImage = document.getElementById("lightboxImage");

// Select the close button
const closeLightbox = document.getElementById("closeLightbox");

// Remember the element used to open the lightbox
let previousFocus = null;

// Function to open the lightbox
function openLightbox(image) {

    // Save the current keyboard focus
    previousFocus = document.activeElement;

    // Use the image that the student clicked
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    // Display the lightbox overlay
    lightbox.classList.add("show");

    // Move focus to the close button
    closeLightbox.focus();
}

// Function to close the lightbox
function hideLightbox() {

    // Hide the lightbox overlay
    lightbox.classList.remove("show");

    // Return focus to the previous element
    if (previousFocus) {
        previousFocus.focus();
    }
}

// Add a click event to each image
galleryImages.forEach((image) => {

    image.addEventListener("click", () => {
        openLightbox(image);
    });

    // Allow keyboard users to open the image using Enter
    image.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            openLightbox(image);
        }

    });

});

// Close when the X button is clicked
closeLightbox.addEventListener("click", hideLightbox);

// Close when the dark background is clicked
lightbox.addEventListener("click", (event) => {

    // Only close if the overlay itself was clicked
    if (event.target === lightbox) {
        hideLightbox();
    }

});

// Close lightbox by pressing the Escape key
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        lightbox.classList.contains("show")
    ) {
        hideLightbox();
    }

    // Keep keyboard focus within the open lightbox
    if (
        event.key === "Tab" &&
        lightbox.classList.contains("show")
    ) {
        event.preventDefault();
        closeLightbox.focus();
    }

});