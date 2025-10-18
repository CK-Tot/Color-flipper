'use strict';

// create a arrrow function so i dont repeat doc.getElID();
const $ = id => document.getElementById(id);

// Access DOM EL
const colorDisplay = $('color-display');
const simpleBtn  = $('simple-btn');
const hexBtn = $('hex-btn');
const copyBtn = $('copy-btn');
const historyEl = $('history');

const simpleColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown'];
let colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];

function getRandomSimpleColor() 
{
    const randomIndex = Math.floor(Math.random() * simpleColors.length);
    return simpleColors[randomIndex];

}


function getRandomHexColor() 
{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    // letters.forEach((letter) => {
    //     color += letter[Math.floor(Math.random() * 16)];
    // })
    return color;
}


function changeColor(color)
{
    document.body.style.backgroundColor = color;
    colorDisplay.textContent = color;
    colorDisplay.style.color = color;

    // Add to history
    colorHistory.unshift({
        color, 
        timestamp: new Date().toLocaleTimeString()
    });

    if (colorHistory.length > 10) {
        colorHistory.pop();
    }

    updateHistory();
    localStorage.setItem('colorHistory', JSON.stringify(colorHistory));

}


function updateHistory ()
{
    historyEl.innerHTML = '';

    colorHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.backgroundColor = 'rgba(255,255,255,0.7)';

        const colorSample = document.createElement('span');
        colorSample.className = 'color-sample';
        colorSample.style.backgroundColor = item.color;

        const colorText = document.createElement('span');
        colorText.textContent = item.color;

        const timeText = document.createElement('span');
        timeText.textContent = item.timestamp;
        timeText.style.fontSize = '12px';
        timeText.style.color = '#666';


        historyItem.appendChild(colorSample);
        historyItem.appendChild(colorText);
        historyItem.appendChild(timeText);
        historyEl.appendChild(historyItem);
    });

}

function copyToClipboard() 
{
    const colorCode = colorDisplay.textContent;
    navigator.clipboard.writeText(colorCode).then(() => {
        // SHow a temp msg

        const ogTxt = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = ogTxt;
        }, 2000);
    });
}


simpleBtn.addEventListener('click', () => {
    changeColor(getRandomSimpleColor());
});

hexBtn.addEventListener('click', () => {
    changeColor(getRandomHexColor());
});


copyBtn.addEventListener('click', copyToClipboard);

// changeColor(getRandomHexColor)

updateHistory();




