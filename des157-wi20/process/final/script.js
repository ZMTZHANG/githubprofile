"use strict";
let index = 0;
let correct = 0;
const dirPrefix = "./images/";
const imgSuffix = ".png";

/**
 * PNGImage constructor
 * @param question
 * @param name
 * @param pair
 * @constructor
 */
function PNGImage(question, name, correct, pair) {
    this.question = question;
    this.name = name;
    this.path = dirPrefix + name + imgSuffix;
    this.ingredient =  dirPrefix + name + "-Ingredient" + imgSuffix;
    this.answer = dirPrefix + name + "-Answer" + imgSuffix;
    this.correct = correct;
    this.pair = pair;
    if (pair != null) {
        pair.pair = this;
    }
}

PNGImage.prototype = {
    constructor: PNGImage,
    getQuestion: function() { return this.question; },
    getName: function() { return this.name; },
    getPath: function() { return this.path; },
    getIngredient: function() { return this.ingredient; },
    getAnswer: function() { return this.answer; },
    getCorrect: function() { return this.correct; },
    getPair: function() { return this.pair; }
};

/**
 * Register events when document is ready.
 * @param event
 */
function addLoadEvent(event) {
    if (typeof window.onload != 'function') {
        window.onload = event;
    } else {
        const old_events = window.onload;
        window.onload = function() {
            old_events();
            event();
        }
    }
}


const images = new Array();
images.push(new PNGImage("Click on the image of the one that you think have lower carbon footprints",
    "Roast-chicken-leg", true, new PNGImage(null,"Steak", false, null)));

images.push(new PNGImage("Click on the image of the one that you think have lower carbon footprints",
    "Cheese", false, new PNGImage(null, "Fried-egg", true, null)));

images.push(new PNGImage("Click on the image of the one that you think have lower carbon footprints",
    "Chicken-Burger", false, new PNGImage(null, "Vegetable-Burger", true, null)));

images.push(new PNGImage("Click on the image of the one that you think have lower carbon footprints",
    "French-Fries", false, new PNGImage(null, "Rice", true, null)));

addLoadEvent(registerButton);


/**
 * Display or hide the next button.
 * @param enable
 * @returns {boolean}
 */
function enableNextButton(idName, enable) {
    if (!document.getElementById || !document.getElementById(idName)) return false;
    let button = document.getElementById(idName);
    if (enable) button.style.display = "block";
    else button.style.display = "none";
}


/**
 * Display the container with the given index
 * @param clsName
 * @param index
 */
function showContainer(clsName, index) {
    if (!document.getElementsByClassName || !document.getElementsByClassName(clsName)) return false;
    let containers = document.getElementsByClassName(clsName);
    for (let i = 0; i < containers.length; i++) {
        if (i == index) {
            containers[i].style.display = "block";
        } else {
            containers[i].style.display = "none";
        }
    }
}


/**
 * Get start button is triggered
 */
function registerButton() {
    // check browse support this
    if (!document.getElementById || !document.getElementsByClassName) return false;
    let start = document.getElementById("start");
    // attach the event
    start.onclick = function() {
        showContainer("container", 1);
        nextButtonActivate();
    }

    // return to home
    let home = document.getElementsByClassName("home");
    for (let i = 0; i < home.length; i++) {
        home[i].onclick = function() {
            index = 0;
            correct = 0;
            showContainer("container", 0);
        }
    }

    // next button
    let next = document.getElementById("next");
    next.onclick = nextButtonActivate;

    // member button
    let member1 = document.getElementById("member1");
    member1.onclick = function() {
        showContainer("container", 3);
    }

    let info = document.getElementById("info");
    let member2 = document.getElementById("member2");
    member2.onclick = function() {
        showContainer("container", 4);
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        info.innerHTML = "Name: " + name + "&#10;" + "Phone: " + phone + "&#10;" + "Email: " + email + "&#10;" +
            "Password: " + password + "&#10;";
    }

    showContainer("container", 0);
}

/**
 *
 * @param image
 */
function removeImageListener(image) {
    image.onclick = null;
    image.onmouseout = null;
    image.onmouseover = null;
}

/**
 *
 * @param image
 * @param png
 * @param callback
 */
function addImageListener(image, png, callback) {
    // add event listener
    image.onmouseover = function () {
        image.setAttribute("src", png.getIngredient());
        image.onclick = function () {
            if (png.getCorrect()) {
                correct++;
            }
            image.setAttribute("src", png.getAnswer());
            callback();
        }
    }

    image.onmouseout = function () {
        image.setAttribute("src", png.getPath());
    }
}


/**
 * Gets the first or last child.
 * @param class_name
 * @param first
 * @returns {null}
 */
function getChild(class_name, first) {
    if (!document.getElementsByClassName(class_name)) return null;
    let elements = document.getElementsByClassName(class_name)[0];
    let child = null;
    for (let i = 0; i < elements.childNodes.length; i++) {
        if (elements.childNodes[i].nodeType == 1) {
            child = elements.childNodes[i];
            if (first) break;
        }
    }

    return child;
}


function nextButtonActivate() {
    if (!document.getElementById || !document.getElementsByClassName || !document.getElementsByClassName("container")) {
        return false;
    }
    if (index < images.length) {
        showContainer("container", 1);
    }  else {
        showContainer("container", 2);
        let result = document.getElementById("result");
        let message = document.getElementById("message");
        if (correct == images.length) {
            result.innerHTML = "Wow!!! You got 4 of 4 answers right!";
            message.innerHTML = "Because you answered all the questions correctly, you can become a member of our website and get a discount to buy Low carbon diet.";
            enableNextButton("member1", true);
        } else {
            result.innerHTML = "You got " + correct + " of " + images.length + " answers right!\n";
            message.innerHTML = "Not so proud of how you did? Please visit link\n" +
                "        <a href=\"https://www.greeneatz.com/foods-carbon-footprint.html\">https://www.greeneatz.com/foods-carbon-footprint.html</a>\n" +
                "        to learn more about Low carbon diet\n" +
                "        If you get full marks for all the questions, you can become a member of our website and get a discount for\n" +
                "        purchasing Low impact.";
            enableNextButton("member1", false);
        }

        return;
    }

    // hide the next button
    enableNextButton("next", false);

    let png = images[index];
    // set h2 element
    let h2_node = document.getElementById("description");
    h2_node.innerHTML = png.getQuestion();

    // get the left image element
    let left_img = getChild("left", true);
    // get the left p element
    let left_p = getChild("left", false);

    // set the source of the image
    left_img.setAttribute("src", png.getPath());
    // set the paragraph content
    left_p.innerHTML = png.getName();

    // get the right image element
    let right_img = getChild("right", true);
    // get the right p element
    let right_p = getChild("right", false);
    // set the source of the image
    right_img.setAttribute("src", png.getPair().getPath());
    // set the paragraph content
    right_p.innerHTML = png.getPair().getName();

    function callback() {
        removeImageListener(left_img);
        removeImageListener(right_img);
        enableNextButton("next", true);
    }
    addImageListener(left_img, png, callback);
    addImageListener(right_img, png.getPair(), callback);
    index++;
}