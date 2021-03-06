let url = 'https://io.adafruit.com/api/v2/mais/feeds/button';
let counter = 0;
let brushStroke; // Declare object


function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(255);
    rect(0, 0, width, height);
    if (counter % 80 == 0) {
        getData();
    }
    counter++;
}

function getData() {
    let data;
    httpGet(url, 'json', function (response) {
        //        console.log(response);
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




function setup() {
    createCanvas(500, 500);
    background(255);

}

function mousePressed() {
    // Create object
    // push();
    translate(100, 100);
    rotate(random(-2 * 3.14));
    brushStroke = new BrushStroke();
    // pop();
    brushStroke.display();

}

class BrushStroke {
    constructor() {
        this.w = random(200);
        this.y1 = random(400);
        strokeWeight(random(5));
    }
    display() {
        rotate(random(2 * 3.14));

        for (let x = 0; x < this.w; x += 5) {
            //line(x1, y1, x2, y2)
            line(x, this.y1, x, 500);
        }
    }

}
