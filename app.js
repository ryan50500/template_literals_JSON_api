const meals = document.getElementById('meals');

async function fetchData() {

    const response = await fetch('https://dev.menu.ninja/api/menu/156?key=8j5vfe%24*pfb**rzt&pretty=1');
    const data = await response.json();
    const menuData = data.menu.items;

    // assign the array we are looping through to a variable called 'dataToShow'
    let dataToShow = menuData.map((foodItem) => {

      return  `
        <div class="flex">
            <h2>${foodItem.name}</h2>
            <img src="${foodItem.image}"
            alt="${foodItem.details}">
            <p>${foodItem.details}</p>
            <p>£${foodItem.prices.price.price}</p>
        </div>
    `
    });

    // set the empty div to be the template literal HTML
    meals.innerHTML = dataToShow;
}

fetchData();



//  form validation
// validation on hitting 'Submit' button
function validate() {
    var name = document.getElementById('fname');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');

    if (name.value.trim() == "") {
        $('.name_error').css('display', 'block');
        name.style.border = "2px solid red";
        $('.name_error').text('Please enter your name');
    }
    if (email.value.indexOf('@') < 1) {
        $('.email_error').css('display', 'block');
        email.style.border = "2px solid red";
        $('.email_error').text('Please enter a valid email address');
    }
    if (subject.value.trim() == "") {
        $('.comment_error').css('display', 'block');
        subject.style.border = "2px solid red";
        $('.comment_error').text('Please leave a comment');
    } else if (subject.value.length < 5) {
        $('.comment_error').css('display', 'block');
        $('.comment_error').text('Comment must be at least 5 characters');
        subject.style.border = "2px solid red";
    }
    if (subject.value.trim() == "" || email.value.indexOf('@') < 1 || name.value.trim() == "") {
        return false;
    } else {
        $('.thank_you').slideDown('slow');
        name.style.border = "1px solid #ccc";
        email.style.border = "1px solid #ccc";
        subject.style.border = "1px solid #ccc";
        document.getElementById("myForm").reset();
        // removing thank you message after 4 seconds
        setTimeout(function() {
            $('.thank_you').slideUp('slow');
        }, 4000);
        // stops form from being submitted
        return false;
    }
}

// validation on name field
document.getElementById('fname').addEventListener('blur', validateName);

function validateName() {
    var name = document.getElementById('fname');
    if (name.value.trim() == "") {
        $('.name_error').css('display', 'block');
        name.style.border = "2px solid red";
    } else {
        $('.name_error').css('display', 'none');
        name.style.border = "2px solid green";
    }
}

// validation on email field
document.getElementById('email').addEventListener('blur', validateEmail);

function validateEmail() {
    var email = document.getElementById('email');
    if (email.value.indexOf('@') < 1) {
        $('.email_error').css('display', 'block');
        email.style.border = "2px solid red";
    } else {
        $('.email_error').css('display', 'none');
        email.style.border = "2px solid green";
    }
}

// validation on comment field
document.getElementById('subject').addEventListener('blur', validateComment);

function validateComment() {
    var subject = document.getElementById('subject');
    if (subject.value.trim() == "") {
        $('.comment_error').css('display', 'block');
        $('.comment_error').text('Please leave a comment');
        subject.style.border = "2px solid red";
    } else if (subject.value.length < 5) {
        $('.comment_error').css('display', 'block');
        $('.comment_error').text('Comment must be at least 5 characters');
        subject.style.border = "2px solid red";
    } else {
        $('.comment_error').css('display', 'none');
        subject.style.border = "2px solid green";
    }
}