// Adafruit IO Digital Output Example
// Tutorial Link: https://learn.adafruit.com/adafruit-io-basics-digital-output
//
// Adafruit invests time and resources providing this open source code.
// Please support Adafruit and open source hardware by purchasing
// products from Adafruit!
//
// Written by Todd Treece for Adafruit Industries
// Copyright (c) 2016 Adafruit Industries
// Licensed under the MIT license.
//
// All text above must be included in any redistribution.
//edited by Mais on March 11
/************************** Configuration ***********************************/

// edit the config.h tab and enter your Adafruit IO credentials
// and any additional configuration needed for WiFi, cellular,
// or ethernet clients.
#include "config.h"

/************************ Example Starts Here *******************************/

// digital pin, pin that goes to your LED
#define BUTTON_PIN 16 
#define LED_PIN 13

// feedName state
bool current = false;
bool last = false;

// set up the 'digital' feed
//put in your feed name you created in Adafruit IO
AdafruitIO_Feed *feedName = io.feed("feedName"); //New!


void setup() {

    // set feedName pin as an input, set led pin as output
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  
  // start the serial connection
  Serial.begin(115200);

  // wait for serial monitor to open
  while(! Serial);

  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  // set up a message handler for the 'digital' feed.
  // the handleMessage function (defined below)
  // will be called whenever a message is
  // received from adafruit io.

  //change to your feed name you created in Adafruit IO
  feedName->onMessage(handleMessage); //New!

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());

  //change to your feed name you created in Adafruit IO
  feedName->get(); //New!

}

void loop() {

  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  io.run();

    // grab the current state of the feedName.
  // we have to flip the logic because we are
  // using a pullup resistor.
  if(digitalRead(BUTTON_PIN) == HIGH){
    current = true;
    digitalWrite(LED_PIN, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
  }else{
    current = false;
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
  }
  // return if the value hasn't changed
  if(current == last){
    return;
  }
  
  // save the current state to the 'digital' feed on adafruit io
  Serial.print("sending feedName -> ");
  Serial.println(current);

  //place your specific feed name
 feedName->save(current); //New!

  // store last feedName state
  last = current;

}

// this function is called whenever an 'digital' feed message
// is received from Adafruit IO. it was attached to
// the 'digital' feed in the setup() function above.

//change to your feed name you created in Adafruit IO
void handleMessage(AdafruitIO_Data *feedName) { // New!

  Serial.print("received <- ");

//change to your feed name you created in Adafruit IO
  if(feedName->toPinLevel() == HIGH) // New!
    Serial.println("HIGH");
  else
    Serial.println("LOW");

//change to your feed name you created in Adafruit IO
  digitalWrite(LED_PIN, feedName->toPinLevel()); // New!
}
