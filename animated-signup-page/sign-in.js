let cookieExpiration = new Date();
cookieExpiration.setFullYear(cookieExpiration.getFullYear() + 1);
//as of right now, this script works exactly how I want. if you wanna try and make it more efficient, be my guest


//get elements and stuff
const innerContainerA = document.querySelector("#inner-container-A");
const innerContainerB = document.querySelector("#inner-container-B");
const pageHalfA = document.querySelector("#page-half-A");
const pageHalfB = document.querySelector("#page-half-B");
const fieldContainer = document.querySelector("#field-container");
const logo = document.querySelector("#logo");
const logom = document.querySelector("#logom");
const innerContainerA1 = document.querySelector("#inner-container-A1");
const innerContainerB1 = document.querySelector("#inner-container-B1");
const fieldContainer1 = document.querySelector("#field-container2");


//shouldnt need edited, this is the animation code
function switchPages() {
    let fc = 1;
    let phA = 60;
    let phB = 40;

    function keyframe1() {
        if (fc >= 0) {
            innerContainerA.style.opacity = fc;
            logo.style.opacity = fc;

            fc -= 0.05;
            setTimeout(keyframe1, 15);
        } else {
            innerContainerA.style.display = "none";
            logo.style.opacity = 0;
            keyframe2();
        };
    }
    function keyframe2() {
        
        if (phB < 1500) {
            pageHalfA.style.width = `${phA}%`;
            pageHalfB.style.width = `${phB}%`;

            phA /= 1.1;
            phB *= 1.1;
            setTimeout(keyframe2, 15);
        } else {
            pageHalfA.style.width = `${0}%`;
            pageHalfB.style.width = `${100}%`;
            fc = 0;
            innerContainerB.style.display = "block";
            keyframe3();
            
        };
    }
    function keyframe3() {
        if (fc <= 1) {
            innerContainerB.style.opacity = fc;

            fc += 0.05;
            setTimeout(keyframe3, 15);
        } else {
            //end the animation
        };
    }
    
    keyframe1();
    
    
};



//this is where the logic for logging in will go
function checkCredentials() {

    //get the values from the page
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;


    

    //add the additional logic here
};


//this is where the logic for creating an account will go
function createAccount() {

    //get the values from the page
    let newUsername = document.querySelector("#create-username").value;
    let newPassword = document.querySelector("#create-password").value;
    let confirmedPassword = document.querySelector("#confirm-password").value;
    let displayName = document.querySelector("#display-name").value;
    let dateOfBirth = document.querySelector("#date-of-birth").value;
    let phoneNumber = document.querySelector("#phone-number").value;         
    let emailAddress = document.querySelector("#email-address").value;
    let termsConsent  = document.querySelector("#terms-consent");

    
    //add the additional logic here
}; 