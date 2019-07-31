"use strict";

const nav = document.querySelector("#nav-main");
const menu_toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

const overlay = document.getElementById("overlay");
overlay.addEventListener("animationend", function() { overlay.style.setProperty('display','none'); });

//toggle menu
var navToggle = function() {
    menu.classList.toggle("active");
    nav.classList.toggle("active");
    menu_toggle.dataset.icon == "a" ? menu_toggle.dataset.icon = "M" : menu_toggle.dataset.icon = "a";    
}
menu_toggle.addEventListener("click", navToggle);

//collapse menu on resize
var navCollapse = function() {
    if(menu.classList.contains("active")) 
        navToggle();
}

//shrink nav
var navShrink = function() {
    nav.classList.toggle("shrink", document.scrollingElement.scrollTop > 100)
};
navShrink();
window.onscroll = navShrink;

// close menu when a #nav-main link is clicked
const links = document.querySelectorAll(".logo, .menu a");
links.forEach(function(i) {
    i.addEventListener("click", navCollapse);
});

//topics
const topics = document.querySelectorAll(".topic");
const menu_topics = document.querySelectorAll(".category a");

var showTopics = function(tag) {
    topics.forEach(function(i) {
        if (i.dataset.tag == tag) {
            i.style.display = "block";
            i.classList.add("fadeInUp");
        }
        else {
            i.style.display = "none";
        }
    });
    menu_topics.forEach(function(i) {
        (i.dataset.tag == tag) ? i.classList.add("active") : i.classList.remove("active")
    });
}
menu_topics.forEach(function(i) {
    i.addEventListener("click", function() {
        showTopics(i.dataset.tag);
    });
});
showTopics("today");

//blog
const control_prev = document.querySelector("#blog .ctrl-prev");
const control_next = document.querySelector("#blog .ctrl-next");
const post_list = document.querySelector("#blog .list");
const post = document.querySelector("#post1");

control_prev.addEventListener("click", function() {
    var scroll = post_list.scrollLeft;
    post_list.scrollTo({
        left: scroll - post.offsetWidth
    });
});

control_next.addEventListener("click", function() {
    var scroll = post_list.scrollLeft;
    post_list.scrollTo({
        left: scroll + post.offsetWidth
    });
});

window.onresize = function() {
    navCollapse;
    post_list.scrollTo({
        left: 0
    });
};