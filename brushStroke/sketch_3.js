let url = 'https://io.adafruit.com/.../feeds/button';
let counter = 0;
let brushStroke; // Declare object
let currentDate;


function setup() {
    createCanvas(window.innerWidth - 100, window.innerHeight - 100);
    background(255);

}

function draw() {
    currentDate = new Date();

    if (counter % 80 == 0) {
        getData();
    }
    counter++;
}

function mousePressed() {
    // Create object
    // push();
    translate(random(400));
    rotate(random(-2 * 3.14));
    brushStroke = new BrushStroke();
    // pop();
    brushStroke.display();
}


function getData() {
    let data;
    httpGet(url, 'json', function (response) {
        console.log(response);

        //        currentDate.toLocaleString();
        console.log(currentDate.toLocaleDateString());
        //        "2021-03-05T15:09:44Z"



        data = response.last_value;
        if (data == 0) {
            //            line(30, 20, 85, 75);
            // push();
            translate(100, 100);
            rotate(random(-2 * 3.14));
            brushStroke = new BrushStroke();
            // pop();
            brushStroke.display();

        }

        console.log(data);
    });
}

class BrushStroke {
    constructor() {
        this.w = random(innerWidth);
        this.y1 = random(innerHeight);
        strokeWeight(random(6));
    }
    display() {
        rotate(random(2 * 3.14));

        for (let x = 0; x < this.w; x += 5) {
            //line(x1, y1, x2, y2)
            line(x, this.y1, x, 500);
        }
    }

}

function keyPressed() {
    //    if (key == 's' || key == 'S') console.log('save');
    //    if (key == 's' || key == 'S') save(cnv, 'png');
    if (key == 's' || key == 'S') saveCanvas(currentDate + '.png');
    if (key == 'Escape' || key == 'r' || key == 'R') clear();
}
