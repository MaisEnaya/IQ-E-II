let maisUrl = 'https://io.adafruit.com/api/v2/mais/feeds/marleefeed'; //recieve Mais IO data
let marleeUrl = 'https://io.adafruit.com/api/v2/finchma15/feeds/maisfeed'; // recieve Marlee's IO data 

let counter = 0;
var data = 0;


function setup() {
    createCanvas(400, 400);
    myButton = createButton('Click me to turn on Marlee LED!');
    myButton.mousePressed(press);
    myButton.mouseReleased(off);
    myButton2 = createButton('Click me to turn on Mais LED!');
    myButton2.mousePressed(press2);
    myButton2.mouseReleased(off2);
}

function draw() {
    fill(255, 10);
    rect(0, 0, width, height);
    if (counter % 80 == 0) {
        maisGetData(); //call Mais data, represtened by the red ellipse
        marleeGetData(); //call Marlee data, represented by the blue ellipse
    }
    counter++;
}

//marlee button
function press() {
    data = 1;
    console.log(data);
    sendData(data);
}

function off() {
    data = 0;
    console.log(data);
    sendData(data);
}

//mais button
function press2() {
    data = 1;
    console.log(data);
    sendData2(data);
}

function off2() {
    data = 0;
    console.log(data);
    sendData2(data);
}

function maisGetData() {
    let data;
    httpGet(maisUrl, 'json', function (response) {
        console.log(response);
        data = response.last_value;
        let resize = map(data, 1, 0, 25, 50);
        noStroke();
        fill(255, 0, 0);
        ellipse(width / 2, height / 2, resize);
        //if no data, data = 0, ellipse is 25. if button pressed, data = 1 then 0. button resize to 150 then back to 25
        console.log(data);
    });
}


function marleeGetData() {
    let data;
    httpGet(marleeUrl, 'json', function (response) {
        console.log(response);
        data = response.last_value;
        let resize = map(data, 1, 0, 25, 50);
        noStroke();
        fill(0, 0, 255);
        ellipse(width / 4, height / 2, resize);
        //if no data, data = 0, ellipse is 25. if button pressed, data = 1 then 0. button resize to 150 then back to 25
        console.log(data);
    });
}

//turn on marlee led
function sendData(turnOn) {
    let postData = {
        "value": turnOn,
        "X-AIO-Key": "marleeKey"
    };
    httpPost(marleeUrl + '/data', 'json', postData, function (result) {
        console.log(result);
    });
}

//turn on mais led
function sendData2(turnOn) {
    let postData2 = {
        "value": turnOn,
        "X-AIO-Key": "maisKey"
    };
    httpPost(maisUrl + '/data', 'json', postData2, function (result) {
        console.log(result);
    });
}
