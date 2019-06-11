function GetElements() {
    for (let i = 0; i < 32; i++) {
        arr1.push(Math.round(Math.random() * 99))
    }
    counterDiv.textContent = 'Gussed: ' + counter + '/32. ' + 'Bad clicks: ' + counterClicks;
}

function Expend() {
    for (let i = 0; i < 32; i++) {
        arr1.push(arr1[i]);     // could have been used spread operator
    }
}

function Mixer() {
    let container;

    for (let i = 0; i < 64; i++) {
        let randIndex = Math.round(Math.random() * 63);
        container = arr1[i];
        arr1[i] = arr1[randIndex];
        arr1[randIndex] = container;
    }
}

function AddCartsValue() {
    for (let i = 0; i < arrayCart.length; i++) {
        arrayCart[i].innerText = arr1[i];
    }
}

function getRandomColor() {
    let color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
}

function setColor() {
    let color = getRandomColor();
    for (let i = 0; i < targets.length; i++) {
        targets[i].style.background = color;
    }
}

function isShow(e) {
    let target = e.target;
    if (!isNaN(+target.innerText) && !target.classList.contains('true') && targets.length !== 2) {
        target.classList.add('spin', 'isShow');
        if (!target.classList.contains('true')) {
            numbers.push(+target.innerText);
        }
        targets.push(target);
        if (numbers.length === 2) {
            targets[0].classList.add('check');
            if (targets[1].classList.contains('check')) {
                targets[0].classList.remove('check', 'isShow', 'spin');
                numbers.length = 0;
                targets.length = 0;
            } else {
                targets[0].classList.remove('check');
                counterClicks += 1;
                pickHandler();
            }
        }
    }
}

function pickHandler() {
    if (numbers[0] === numbers[1]) {
        numbers.length = 0;
        setColor();
        for (let i = 0; i < targets.length; i++) {
            targets[i].classList.add('true');
        }
        targets.length = 0;
        counter += 1;
        win();
        addCounter();
        getSound.play();
    } else {
        numbers.length = 0;
        if (!targets[0].classList.contains('true') && !targets[1].classList.contains('true')) {
            setTimeout(classRemover, 650);
        }

        function classRemover() {
            targets.forEach((item, index, array) => {
                array[index].classList.remove('isShow');
                array[index].classList.remove('spin');
            });
            targets.length = 0;
        }
        addCounter();
    }
}

function addCounter() {
    counterDiv.textContent = 'Gussed: ' + counter + '/32. ' + 'Bad clicks: ' + counterClicks;
}

function win() {
    if (counter === 32) {
        winSound.play();
    }
}

const wrapper = document.querySelector('#wrapper'),
      carts = document.querySelectorAll('.item'),
      counterDiv = document.querySelector('#counter'),
      buttonStart = document.querySelector('#startBut'),
      startSong = new Audio(src='Source/Sounds/Start.mp3'),
      getSound = new Audio(src='Source/Sounds/Get.mp3'),
      winSound = new Audio(src='Source/Sounds/Win.mp3');

let arrayCart = Array.from(carts),
    arr1 = [],
    numbers = [],
    counter = 0,
    targets = [],
    counterClicks = 0;

buttonStart.onclick = function startTheGame() {
    GetElements();
    Expend();
    Mixer();
    AddCartsValue();
    wrapper.style.display = 'grid';
    buttonStart.style.display = 'none';
    startSong.play();
};

wrapper.addEventListener('click', (e) => {
    isShow(e);
}, false);
