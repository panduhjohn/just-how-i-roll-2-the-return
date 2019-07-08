// Initialization

const sixes = [];
const doubleSixes = [];
const twelves = [];
const twenties = [];

window.onload = init;


function init() {
    // Regular vanilla JS.
    const d6Roll = document.querySelector('#d6-roll');
    d6Roll.addEventListener('click', rollD6);

     // Set using addClick helper.
    addClick('#double-d6-roll-1', rollDoubleD6);
    addClick('#double-d6-roll-2', rollDoubleD6);

    // Set using addClick helper.
    addClick('#d12-roll', rollD12);
    
    // Set using dumDumDom helper
    dumDumDom('#d20-roll', 'click', rollD20);

    // addClick again.
    addClick('#reset-button', resetAllRolls);

    setStartingImages();
}

function setStartingImages() {
    const START_DIRECTORY = './images/start'
    const SIX_SIDED_START_IMAGE = `${START_DIRECTORY}/d6.png`;

    setSrc('#d6-roll', SIX_SIDED_START_IMAGE);
    setSrc('#double-d6-roll-1', SIX_SIDED_START_IMAGE);
    setSrc('#double-d6-roll-2', SIX_SIDED_START_IMAGE);
    setSrc('#d12-roll', `${START_DIRECTORY}/d12.jpeg`)
    setSrc('#d20-roll', `${START_DIRECTORY}/d20.jpg`);
}

// Roll functions

function rollD6() {
    const rand = Math.random();
    const range = rand * 6;
    const roll = Math.ceil(range);
    sixes.push(roll);

    let sum = 0;
    for (let i = 0; i < sixes.length; i++) {
        sum = sum + sixes[i];
    }
    
    const mean = (sum / sixes.length).toFixed(2);
    const meanSection = document.querySelector('#d6-rolls-mean')
    meanSection.innerText = mean;

    const sorted = sixes.sort();
    const middleIndex = Math.floor(sorted.length / 2);
    const median = sorted[middleIndex];

    const medianSection = document.querySelector('#d6-rolls-median');
    medianSection.innerText = median;

    const mode = getMode(sixes);
    const modeSection = document.querySelector('#d6-rolls-mode');
    modeSection.innerText = mode;
    
    const rollSrc = `/images/d6/${roll}.png`;
    const rollImage = document.querySelector('#d6-roll');
    rollImage.src = rollSrc;
}

function rollDoubleD6() {
    const roll1 = getRandomNumber(6);
    const roll2 = getRandomNumber(6);
    const roll = roll1 + roll2;
    doubleSixes.push(roll);

    const mean = getMean(doubleSixes);
    const median = getMedian(doubleSixes);
    const mode = getMode(doubleSixes);
    placeText('#double-d6-rolls-mean', mean);
    placeText('#double-d6-rolls-median', median);
    placeText('#double-d6-rolls-mode', mode);

    const rollImage1 = getSixSidedDieImage(roll1);
    const rollImage2 = getSixSidedDieImage(roll2);
    setSrc('#double-d6-roll-1', rollImage1);
    setSrc('#double-d6-roll-2', rollImage2);
}

function rollD12() {
    const roll = getRandomNumber(12);
    twelves.push(roll);

    const mean = getMean(twelves);
    const median = getMedian(twelves);
    const mode = getMode(twelves);
    placeText('#d12-rolls-mean', mean);
    placeText('#d12-rolls-median', median);
    placeText('#d12-rolls-mode', mode);

    const rollImage = getNumberImage(roll);
    setSrc('#d12-roll', rollImage);
}

// Uses dumDumDom helper.
function rollD20() {
    const roll = getRandomNumber(20);
    twenties.push(roll);

    const mean = getMean(twenties);
    const median = getMedian(twenties);
    const mode = getMode(twenties);
    dumDumDom('#d20-rolls-mean', 'innerText', mean);
    dumDumDom('#d20-rolls-median', 'innerText', median);
    dumDumDom('#d20-rolls-mode', 'innerText', mode);

    const rollImage = getNumberImage(roll);
    dumDumDom('#d20-roll', 'src', rollImage);
}

// Math Section

function getRandomNumber(max) {
    const rand = Math.random();
    const range = rand * max;
    const result = Math.ceil(range);
    
    return result;
}

function getMean(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    
    const mean = (sum / arr.length).toFixed(2);
    
    return mean;
}

function getMedian(arr) {
    function sortByNumber(a, b) {
        return a - b;
    }
    const sorted = arr.sort(sortByNumber);
    const middleIndex = Math.floor(sorted.length / 2);
    
    return sorted[middleIndex];
}

function getMode(rolls) {
    // Two pass method.
    // const counts = [];
    // for (let i = 0; i < rolls.length; i++) {
    //     const currentRoll = rolls[i];
    //     if (!counts[currentRoll]) {
    //         counts[currentRoll] = 1;
    //     } else {
    //         counts[currentRoll] = counts[currentRoll] + 1;
    //     }
    // }
    
    // let mode = 0;
    // let highestCount = 0;
    // for(let i = 0; i < counts.length; i++) {
    //     const currentCount = counts[i];
    //     if(currentCount && currentCount > highestCount) {
    //         highestCount = currentCount;
    //         mode = i;
    //     }
    // }

    // One pass method
    // const counts = [];
    // let highestCount = 0;
    // let mode = 0;
    // for(let i = 0; i < rolls.length; i++) {
    //     const currentRoll = rolls[i];
    //     if(!counts[currentRoll]) {
    //         counts[currentRoll] = 1;
    //     } else {
    //         counts[currentRoll] = counts[currentRoll] + 1;
    //     }
        
    //     if (counts[currentRoll] > highestCount) {
    //         highestCount = counts[currentRoll]
    //         mode = currentRoll;
    //     }
    // }

    // Objects method one pass
    // Literally just changes the square brackets on the next line to curlies.
    // const counts = {};
    // let highestCount = 0;
    // let mode = 0;
    // for(let i = 0; i < rolls.length; i++) {
    //     const currentRoll = rolls[i];
    //     if(!counts[currentRoll]) {
    //         counts[currentRoll] = 1;
    //     } else {
    //         counts[currentRoll] = counts[currentRoll] + 1;
    //     }
        
    //     if (counts[currentRoll] > highestCount) {
    //         highestCount = counts[currentRoll]
    //         mode = currentRoll;
    //     }
    // }
    
    // Objects method two passes, slightly more complicated.
    const counts = {};
    for (let i = 0; i < rolls.length; i++) {
        const currentRoll = rolls[i];
        if (!counts[currentRoll]) {
            counts[currentRoll] = 1;
        } else {
            counts[currentRoll] = counts[currentRoll] + 1;
        }
    }

    let mode = 0;
    let highestCount = 0;
    let countKeys = Object.keys(counts);
    for(let i = 0; i < countKeys.length; i++) {
        const key = countKeys[i];
        const currentCount = counts[key];
        if(currentCount && currentCount > highestCount) {
            highestCount = currentCount;
            mode = key;
        }
    }

    return mode;
}

function resetAllRolls() {
    sixes.splice(0);
    doubleSixes.splice(0);
    twelves.splice(0);
    twenties.splice(0);

    setStartingImages();
}

// Dom helper functions

function getSixSidedDieImage(roll) {
    return `/images/d6/${roll}.png`;
}

function getNumberImage(roll) {
    return `/images/numbers/${roll}.png`;
}

// Particularly good place for an arrow function instead:
// const getSixSidedDieImage = (roll) => `/images/d6/{roll}.png`

function setSrc(selector, uri) {
    document.querySelector(selector).src = uri;
}

function placeText(selector, text) {
    document.querySelector(selector).innerText = text;
}

function addClick(selector, func) {
    document.querySelector(selector)
        .addEventListener('click', func);
}

function dumDumDom(selector, activity, item) {
    const node = document.querySelector(selector);

    switch(activity) {
        case 'src':
            node.src = item;
            break;
        
        case 'innerText':
            node.innerText = item;
            break;

        case 'click':
            node.addEventListener('click', item);
            break;

        default:
            console.error('An unrecognized activity was passed to dumDumDom');
    }
}