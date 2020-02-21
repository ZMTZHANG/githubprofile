'use strict';
console.log('Hello');
var iphone = document.querySelector('#iphone');
var laptop = document.querySelector('#laptop');
var key = document.querySelector('#key');
var p = document.querySelector('#overlay p');
var close = document.querySelector('#close');

iphone.addEventListener('click', function() {
  overlay.style.display = 'block';
  p.innerHTML = 'I take my mobile phone to school every day. I use it to contact friends and check the time.';
})

laptop.addEventListener('click', function() {
  overlay.style.display = 'block';
  p.innerHTML = 'I bring a laptop every day, because my studio class requires a laptop to do classwork.';
})
key.addEventListener('click', function() {
  overlay.style.display = 'block';
  p.innerHTML = 'I need to bring my car key every day because I need to drive to school.'
})

close.addEventListener('click', function() {
  overlay.style.display = "none";
})
