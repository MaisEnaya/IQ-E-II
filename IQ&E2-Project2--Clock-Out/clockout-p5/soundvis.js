let state;
let snd;
let fileName;
let amp;
let rms;
let d;
let color = 255;
let partymode = false;


function party() {
    partymode = true;
}

function chill() {
    partymode = false;
}

function gotFile(file) {
    snd = loadSound(file.data, _ => {
        snd.play();
    });
    state = select('#state');
    state.html('playing ' + file.name);
    fileName = file.name;

    let noHeader = select('#header');
    noHeader.html(' ');
    //   sound visulization 101, use sound level to animate something https://p5js.org/examples/sound-measuring-amplitude.html
    amp = new p5.Amplitude();
    amp.setInput(snd);
    drawSomething();


}

function playFile() {
    dropzone.style('background-color', 'transparent');
    dropzone.html(' ');
    background(0);
    //    console.log(amp.getLevel());
    //    let test = amp.getLevel();
    //    while (test < 1) {
    //        console.log(test);
    //        drawSomething();
    //    }
}

function mouseClicked() {
    //pause and play from https://elearn.ellak.gr/mod/book/view.php?id=5499&chapterid=3773
    //use the isPlaying to determine whether the sound is playing or not
    // if the sound is not playing
    if (!snd.isPlaying()) {
        // make it play
        snd.play();
        state.html('playing ' + fileName);
        // define the sound level
        snd.setVolume(0.5);
    }
    // else pause it
    else {
        console.log(amp.getLevel());

        snd.pause();
        state.html('paused, click anywhere to resume playing');

    }
}

function drawSomething() {

    //        while (snd.isPlaying()) {
    //            console.log(yes);
    //        }
    rms = amp.getLevel();
    d = map(rms, 0, 1, 1, 5);
    if (!partymode) {
        color = 0;
    } else {
        //    party mode
        color = map(rms, 0, 1, 50, 350);
    }
}

function draw() {
    //how to draw something AFTER the sound file load???? 
    if (!partymode) {
        background(color);
    } else {
        //    party mode
        background(color, 100, 100);
    }
    //    fill('red');
    noFill();
    stroke(255);
    strokeWeight(10);

    // Draw an ellipse with size based on volume
    ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
    if (rms < 1) {
        //        console.log(test);
        drawSomething();
    }

}
