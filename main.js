const d6Button = document.querySelector('.d6-roll')
d6Button.onclick = rollD6;
const doubleD6Button1 = document.querySelector('.double-d6-roll-1')
doubleD6Button1.onclick = rollDoubleD6;
const doubleD6Button2 = document.querySelector('.double-d6-roll-2')
doubleD6Button2.onclick = rollDoubleD6;
const d12Button = document.querySelector('.d12-roll')
d12Button.onclick = rollD12;
const d20Button = document.querySelector('.d20-roll')
d20Button.onclick = rollD20;
const d8Button = document.querySelector('.d8-roll')
d8Button.onclick = rollD8;
const d4Button = document.querySelector('.d4-roll')
d4Button.onclick = rollD4;
const tripleD6Button1 = document.querySelector('.triple-d6-roll-1')
tripleD6Button1.onclick = rollTripleD6;
const tripleD6Button2 = document.querySelector('.triple-d6-roll-2')
tripleD6Button2.onclick = rollTripleD6;
const tripleD6Button3 = document.querySelector('.triple-d6-roll-3')
tripleD6Button3.onclick = rollTripleD6;


////////////////////////////////////////////////////////////////////
function getRollWithMax(max) {
    return Math.ceil(Math.random() * max);
}

function getImage(roll, selector) {
    const newSrc = `./images/d6/${roll}.png`;
    const rollImage = document.querySelector(selector);
    rollImage.src = newSrc;
}

function getNumbersImage(roll, selector) {
    const newSrc = `./images/numbers/${roll}.png`;
    const rollImage = document.querySelector(selector);
    rollImage.src = newSrc;
}
////////////////////////////////////////////////////////////////////

function rollD4() {
    const roll = getRollWithMax(4);
    getNumbersImage(roll, '.d4-roll')
}

function rollD6() {
    const roll = getRollWithMax(6);
    getImage(roll, '.d6-roll')   
}

function rollD8() {
    const roll = getRollWithMax(8);
    getNumbersImage(roll, '.d8-roll')

}
function rollD12() {
    const roll = getRollWithMax(12);
    getNumbersImage(roll, '.d12-roll')
}

function rollD20() {
    const roll = getRollWithMax(20);
    getNumbersImage(roll, '.d20-roll')
}

function rollDoubleD6() {
    const roll1 = getRollWithMax(6);
    const roll2 = getRollWithMax(6);
    getImage (roll1, '.double-d6-roll-1');
    getImage (roll2, '.double-d6-roll-2');
}

function rollTripleD6 () {
    const roll1 = getRollWithMax(6);
    const roll2 = getRollWithMax(6);
    const roll3 = getRollWithMax(6);
    getImage (roll1, '.triple-d6-roll-1');
    getImage (roll2, '.triple-d6-roll-2');
    getImage (roll3, '.triple-d6-roll-3');
}