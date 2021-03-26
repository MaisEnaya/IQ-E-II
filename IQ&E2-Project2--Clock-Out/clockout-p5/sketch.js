let maisUrl = 'https://io.adafruit.com/api/v2/mais/feeds/marleefeed'; //recieve Mais IO data
let marleeUrl = 'https://io.adafruit.com/api/v2/finchma15/feeds/maisfeed'; // recieve Marlee's IO data 

let cnv;
let counter = 0;
let dropzone;


function setup() {
    colorMode(HSB, 360, 100, 100); //hsb hue, saturation, and brithtness. 

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0); //absolute positioning for the canvas
    cnv.style("z-index", "-1"); //editing the stytle inline
    myButton2 = createButton('Turn on my lights!');
    myButton2.mousePressed(press2);
    myButton2.mouseReleased(off2);
    myButton = createButton('notify Marlee!');
    myButton.mousePressed(press);
    myButton.mouseReleased(off);

    //code from coding train 8.15 drag and drop a file. https://youtu.be/o4UmGrPst_c

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, playFile);
    dropText = select('#dropText');
}


function highlight() {
    dropzone.style('background-color', '#FFFF66');
    dropText.html('drop your sound file drop your sound file drop your sound file');
}

function unhighlight() {
    dropzone.style('background-color', '#fff');
    dropText.html('drag a sound file here drag a sound file here drag a sound file here');
}

//marlee button
function press() {
    data = 1;
    // console.log(data);
    sendData(data);
}

function off() {
    data = 0;
    // console.log(data);
    sendData(data);
}

//mais button
function press2() {
    data = 1;
    // console.log(data);
    sendData2(data);
}

function off2() {
    data = 0;
    // console.log(data);
    sendData2(data);
}

function maisGetData() {
    let data;
    httpGet(maisUrl, 'json', function (response) {
        // console.log(response);
        data = response.last_value;
        let resize = map(data, 1, 0, 25, 50);
        noStroke();
        fill(255, 0, 0);
        ellipse(width / 2, height / 2, resize);

        // console.log(data);
    });
}


function marleeGetData() {
    let data;
    httpGet(marleeUrl, 'json', function (response) {
        // console.log(response);
        data = response.last_value;
        let resize = map(data, 1, 0, 25, 50);
        noStroke();
        fill(0, 0, 255);
        ellipse(width / 4, height / 2, resize);
        // console.log(data);
    });
}

//turn on marlee led
function sendData(turnOn) {
    let postData = {
        "value": turnOn,
        "X-AIO-Key": "aio_sczw70qdKk4y8aO42IclQdT6dgRa"
    };
    httpPost(marleeUrl + '/data', 'json', postData, function (result) {
        // console.log(result);
    });
}

//turn on mais led
function sendData2(turnOn) {
    let postData2 = {
        "value": turnOn,
        "X-AIO-Key": "aio_jYEY21IhaROX8z432peiF71rWOVB"
    };
    httpPost(maisUrl + '/data', 'json', postData2, function (result) {
        // console.log(result);
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
