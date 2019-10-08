const electron = require('electron');
const {ipcRenderer} = electron;
window.$ = window.jQuery = require('jquery');

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
form.addEventListener('reset', resetForm);

var outputDiv = document.getElementById('output');

var rangeOutput = document.getElementById('rangeOutput');
var areaOutput = document.getElementById('areaOutput');
var frameOutput = document.getElementById('fraemOutput');
var fvolOutput = document.getElementById('fvolOutput');
var hvolOutput = document.getElementById('hvolOutput');

var rangeContentOutput = document.getElementById('rangeContentOutput');
var areaContentOutput = document.getElementById('areaContentOutput');
var frameContentOutput = document.getElementById('frameContentOutput');
var fvolContentOutput = document.getElementById('fvolContentOutput');
var hvolContentOutput = document.getElementById('hvolContentOutput');

$(outputDiv).hide();

$(rangeOutput).hide();
$(areaOutput).hide();
$(frameOutput).hide();
$(fvolOutput).hide();
$(hvolOutput).hide();

function submitForm(e) {
    e.preventDefault();

    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;

    const range = (length * 2) + ((width * 2) - 4);
    const area = length * width;
    const fvol = (length * width) * height;
    const hvol = ((length * width) * 2) + (range * (height - 2));
    const frame = (range * 2) + ((height - 2) * 4);

    $(outputDiv).show();

    if(height > 1) {
        $(rangeOutput).show();
        $(areaOutput).show();
        $(frameOutput).show();
        $(fvolOutput).show();
        $(hvolOutput).show();

        rangeContentOutput.innerHTML = range.toLocaleString();
        areaContentOutput.innerHTML = area.toLocaleString();
        frameContentOutput.innerHTML = frame.toLocaleString();
        fvolContentOutput.innerHTML = fvol.toLocaleString();
        hvolContentOutput.innerHTML = hvol.toLocaleString();

        window.resizeTo(290, 630);
    } else {
        $(rangeOutput).show();
        $(areaOutput).show();
        $(frameOutput).hide();
        $(fvolOutput).hide();
        $(hvolOutput).hide();

        rangeContentOutput.innerHTML = range.toLocaleString();
        areaContentOutput.innerHTML = area.toLocaleString();

        window.resizeTo(290, 468);
    }

    document.getElementById('output').innerHTML = output;
}

function resetForm(e) {
    window.resizeTo(290, 360);

    $(outputDiv).hide();
    $(rangeOutput).hide();
    $(areaOutput).hide();
    $(frameOutput).hide();
    $(fvolOutput).hide();
    $(hvolOutput).hide();

    document.getElementById('length').focus();
}