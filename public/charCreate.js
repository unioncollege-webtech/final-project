var body = document.getElementById('form');
var pointsLeft = document.getElementById('pointsLeft');
var submit = document.getElementById('submit');
var timeout = null;

function set(el,text){
    while(el.firstChild) {
        el.removeChild(el.firstChild);
    }
    el.appendChild(document.createTextNode(text))}

function handleChange(){
    var vitality = document.getElementsByTagName('input')[2].value;
    var dexterity = document.getElementsByTagName('input')[3].value;
    var strength = document.getElementsByTagName('input')[4].value;
    var intelligence = document.getElementsByTagName('input')[5].value;
    var agility = document.getElementsByTagName('input')[6].value;
    var stealth = document.getElementsByTagName('input')[7].value;
    var pointsleft = 66 - vitality - dexterity - strength - intelligence - agility - stealth;
    set(pointsLeft, 'Points left: ' + pointsleft);
    if(pointsleft == 0) {
        submit.style.display = 'inline'; 
    }
    else {
        submit.style.display = 'none';
    }
}

function eventHandler(){
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout=setTimeout(handleChange, 50);
}

body.onkeydown=body.onkeyup=body.onclick=eventHandler;
handleChange();