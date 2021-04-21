let doc = document,
    numbersBtn = doc.querySelectorAll('.btn-number'),
    clearBtns = doc.querySelectorAll('.btn-clear'),
    enterBtn = doc.querySelector('.btn-enter'),
    display = doc.querySelector('.input'),
    gameField = doc.querySelector('.game-field'),
    drop,
    randomNumber,
    operatorsDrop,
    posDrop = 0,
    arrOperators = ['-', '+', '/', '*']
    arrDrops = [],
    btnPlay = doc.querySelector('.play');




//Calc-----------------------
let numberPress = (number) => {

    if (display.value == '') {
        display.value = number;
    } else {
        display.value += number;
    };
};
//---Keyboard input----------
let KeyDownValue = (code) => {
    let key = doc.querySelector(`.btn[data-key='${code}']`);

    if (key.id === 'clear') {
        display.value = '';
    } else if (key.id === 'delete') {
        display.value = display.value.slice(0, -1);
    };

    if (key.id === 'clear' || key.id === 'delete') {
        display.value == display.value;
    } else {
        if (display.value == '') {
            display.value = key.textContent;
        } else {
            display.value += key.textContent;
        };
    };
}
//---Cleaning--------------
let clear = (id) => {
    if (id === 'clear') {
        display.value = '';
    } else if (id === 'delete') {
        display.value = display.value.slice(0, -1);
    };
}

//---Event-----------------
for (let number of numbersBtn) {
    number.addEventListener('click',
        (e) => numberPress(e.target.textContent));
}

window.addEventListener('keydown',
    (e) => KeyDownValue(e.keyCode));

for (let clearBtn of clearBtns) {
    clearBtn.addEventListener('click',
        (e) => clear(e.srcElement.id));
}
//-----------------------------------




//Drop-------------------------------

function addDrop() {
    gameField.insertAdjacentHTML('afterbegin',
        '<div class="drop"><span class="drop__numbers number-1"></span><br><span class="drop__operator"></span><br><span class="drop__numbers number-2"></span></div>');

    drop = doc.querySelector('.drop'),
    randomNumber = doc.querySelectorAll('.drop__numbers'),
    operatorsDrop = doc.querySelector('.drop__operator'),
    getRandomInRange();
    arrayRandElement(arrOperators);
    dropAappearance();
    moveDrop();
    drop.id = 'drop1';
    arrDrops = (drop.id.slice(-1));
}


//---Random drop values--------------
function getRandomInRange() {
    for (let number of randomNumber) {
        function getRandom(min, max) {
            number.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
        };
        getRandom(1, 100);
    };
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    operatorsDrop.textContent = arr[rand];
}

//--Accidental drop appearance------
function dropAappearance() {
    function randomDropAappearance(min, max) {
        drop.style.left = (Math.floor(Math.random() * (max - min + 1)) + min) - gameField.children[0].clientWidth + 'px';
    };

    randomDropAappearance(gameField.children[0].clientWidth, gameField.clientWidth);
}


//---Droplet movement---------------
function moveDrop() {
    let setClear = setInterval(fallDrop, 10);

    function fallDrop() {
        if (posDrop == gameField.clientHeight -
            gameField.children[1].clientHeight -
            gameField.children[0].clientHeight) {
            clearInterval(setClear)
        } else {
            posDrop++;
            drop.style.top = posDrop + 'px'
        };
    }
}






btnPlay.addEventListener('click', () => {
    addDrop();
    // getRandomInRange();
    // arrayRandElement(arrOperators);
    // dropAappearance ();
    // moveDrop();
    console.log(arrDrops);
})