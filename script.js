const uploadFileInput = document.getElementById('photoUpload')
const image = document.getElementById('photoUpload')
const fullName = document.getElementById('full-name')
const email = document.getElementById('email-address')
const githubUsername = document.getElementById('github-username')
const customContent = document.querySelector('.custom-content')
const previewArea = document.querySelector('.preview-area')
const previewImg = document.getElementById('previewImage')
const actions = document.querySelector('.actions')
const removeButton = document.getElementById('removeBtn')
const changeButton = document.getElementById('changeBtn')
const submitButton = document.getElementById('submit-form-button')
const registerationForm = document.getElementById('registeration-form')
const imageErrorMessage = document.getElementById('image-error-msg')
const fullNameErrorMessage = document.getElementById('full-name-error-msg')
const emailErrorMessage = document.getElementById('email-error-msg')
const githubUsernameErrorMessage = document.getElementById('githubUsername-error-msg')
const error = document.querySelectorAll('.error')
const heroSectionHeading = document.getElementById('hero-section-heading')
const heroSectionParagraph = document.getElementById('hero-section-paragraph')
const mainSection = document.querySelector('.main-section')
let imageURL;
// whenever the file input value changes
uploadFileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        imageURL = URL.createObjectURL(file);
        previewImg.src = imageURL;
        // inline styling
        previewArea.style.display = "flex";
        customContent.style.display = "none";
    }
});
changeButton.addEventListener("click", (event) => {
    // stops the button from submitting the form
    event.preventDefault();
    uploadFileInput.value = "";
    uploadFileInput.click();
});
// Remove Image button
removeButton.addEventListener("click", () => {
    uploadFileInput.value = "";
    previewImg.src = "";
    // inline styling
    previewArea.style.display = "none";
    customContent.style.display = "flex";
});
// on form submittion
registerationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;
    // Clear previous errors
    error.forEach(div => div.textContent = '');
    if (image.value === "") { 
        addingRedBorderForError(image)
        removingRedBorderForError(image)
        displayingErrorMessage("Image", imageErrorMessage)
        isValid = false;
    }
    if (fullName.value === "") {
        addingRedBorderForError(fullName)
        removingRedBorderForError(fullName)
        displayingErrorMessage("Full name", fullNameErrorMessage)
        isValid = false;
    }
    if (email.value === "") {
        addingRedBorderForError(email)
        removingRedBorderForError(email)
        displayingErrorMessage("email address", emailErrorMessage)
        isValid = false;
    }
    if (githubUsername.value === "") {
        addingRedBorderForError(githubUsername)
        removingRedBorderForError(githubUsername)
        displayingErrorMessage("github username", githubUsernameErrorMessage)
        isValid = false;
    }
    // validate email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        addingRedBorderForError(email)
        removingRedBorderForError(email)
        error.textContent = 'Please enter a valid email address.';
        isValid = false;
    }
    // Validate GitHub Username 
    if (githubUsername.value && githubUsername.value.length < 2) {
        addingRedBorderForError(githubUsername)
        removingRedBorderForError(githubUsername)
        error.textContent = 'GitHub Username must be at least 2 characters if provided.';
        isValid = false;
    }
    if (isValid) {
        // If all validations pass, you can submit the form data
        displayingticketReady()
    }
})
// for adding the red border to inputs when error occurs
function addingRedBorderForError(InputType) {
    InputType.style.border = "2px solid #e16151"
}
// for removing the red border to inputs when error occurs
function removingRedBorderForError(InputType) {
    setTimeout(() => {
        InputType.style.border = ""
    }, 4000);
}
// displaying the error messages on inputs
function displayingErrorMessage(fieldName, imageErrorMessage) {
    const errorImgContainer = document.createElement('div')
    const errorImg = document.createElement('img')
    errorImg.classList.add("error-img")
    errorImg.src = "assets/images/icon-info.svg"
    errorImg.alt = "icon-info"
    errorImgContainer.appendChild(errorImg)
    imageErrorMessage.appendChild(errorImgContainer)
    const errorTextContainer = document.createElement('div')
    const errorText = document.createElement('p')
    errorText.classList.add("error-text")
    errorText.textContent = `${fieldName} cannot be empty`
    errorTextContainer.appendChild(errorText)
    imageErrorMessage.appendChild(errorTextContainer)
}
// displaying ticketReady card
function displayingticketReady() {
    heroSectionHeading.innerHTML = `Congrats, <span class="highlight-name">${fullName.value}</span>! Your ticket is ready.`;
    heroSectionParagraph.innerHTML = `We've emailed your ticket to <span class="highlight-email">${email.value}</span> and will send updates in the run to the event.`;
    // remove the form from mainContainer

   registerationForm.classList.add("fade-out");

setTimeout(() => {
  registerationForm.style.display = "none";
}, 400);
    const ticketCard = document.createElement('img')
    ticketCard.src = "assets/images/pattern-ticket.svg"
    ticketCard.alt = "pattern-ticket"
    // add class ticket-card to ticketCard
    ticketCard.classList.add("ticket-card")
    mainSection.appendChild(ticketCard)

    /* trigger animation */
requestAnimationFrame(() => {
    ticketCard.classList.add("show");
  });
    displayinglogoDateCity()
    displayingProfileNameEmail()
    displayingTicketNumber()
}
function displayinglogoDateCity() {
    const newContainer = document.createElement('div')
    // give class to newContainer 
    newContainer.classList.add("new-container")
    const logoImg = document.createElement('img')
    logoImg.src = "assets/images/logo-full.svg"
    logoImg.alt = "logo-full"
    newContainer.appendChild(logoImg)
    const dateParagraph = document.createElement('p')
    // give class to dateParagraph
    dateParagraph.classList.add("date-paragraph")
    // get current date
    const today = new Date();
    // Format it (example: "Tuesday, November 4, 2025")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    dateParagraph.textContent = formattedDate
    newContainer.appendChild(dateParagraph)
    // fetching the city data from API
    fetch("https://ipwho.is/")
        .then(res => res.json())
        .then(data => {
            const location = document.createElement("span")
            // give class to location
            location.classList.add("location")
            location.textContent = `/ ${data.city}, ${data.region}`;
            dateParagraph.appendChild(location)
        })
        .catch(() => {
            const unknownLocation = document.createElement("span")
            unknownLocation.textContent = "Unknown Location";
            dateParagraph.appendChild(unknownLocation)
        });
    mainSection.appendChild(newContainer)

    setTimeout(() => {
        newContainer.classList.add("show");
      }, 200);
}
function displayingProfileNameEmail() {
    const secNewContainer = document.createElement('div')
    // give the class to secNewContainer
    secNewContainer.classList.add("sec-new-container")
    const profileImgDiv = document.createElement('div')
    // give the class to profileImgDiv 
    profileImgDiv.classList.add("profile-img-div")
    const profileImg = document.createElement('img')
    // give the class to profileImg
    profileImg.classList.add("profile-img")
    profileImg.src = imageURL
    profileImg.alt = "profile-image"
    profileImgDiv.appendChild(profileImg)
    secNewContainer.appendChild(profileImgDiv)
    const userNameEmailDiv = document.createElement('div')
    const userFullName = document.createElement('h3')
    userFullName.textContent = fullName.value
    userNameEmailDiv.appendChild(userFullName)
    const userEmail = document.createElement('p')
    userEmail.classList.add("userEmail")
    userEmail.textContent = `@${githubUsername.value}`
    userNameEmailDiv.appendChild(userEmail)
    secNewContainer.appendChild(userNameEmailDiv)
    mainSection.appendChild(secNewContainer)

    setTimeout(() => {
        secNewContainer.classList.add("show");
      }, 350);
}
// for generating random ticket number 
function generateTicketNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `#${randomNumber}`;
}
function displayingTicketNumber() {
    const ticketNumberContainer = document.createElement('div')
    // give class to ticketNumberContainer
    ticketNumberContainer.classList.add("ticket-number-container")
    const ticketNumber = document.createElement('h4')
    // give class to ticketNumber
    ticketNumber.classList.add("ticket-number")
    ticketNumber.textContent = generateTicketNumber()
    ticketNumberContainer.appendChild(ticketNumber)
    mainSection.appendChild(ticketNumberContainer)

    setTimeout(() => {
        ticketNumberContainer.classList.add("show");
      }, 500);
}