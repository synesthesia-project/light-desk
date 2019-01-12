/**
 * An example project that flashes a "light" at regular intervals.
 *
 * This project doesn't actually control a light, but there is a
 * placeholder left where that can be done, (e.g. so it can be
 * connected to something), and it's simulated on the light desk
 * itself.
 *
 */
import * as lightDesk from '@synesthesia-project/light-desk';

// Variables

/** Which frame we're currently on */
let frame = 0;
/** Number of frames per second */
let framerate = 60;
/** How many frames it takes for the light brightness to fade to 0 after a flash */
let fadeDuration = 15;
/** How often the light should "flash" */
let intervalFrames = 40;
/** Current brightness (between 0 and 1) */
let brightness = 1;

// Construct the light desk

const desk = new lightDesk.LightDesk();

const group = new lightDesk.Group();
desk.setRoot(group);

group.addChild(new lightDesk.Label('Framerate:'));
const framerateControl = new lightDesk.SliderButton(framerate, 1, 60, 1);
group.addChild(framerateControl);
framerateControl.addListener(value => framerate = value);

group.addChild(new lightDesk.Label('Fade Speed (in frames):'));
const fadeControl = new lightDesk.SliderButton(fadeDuration, 1, 100, 1);
group.addChild(fadeControl);
fadeControl.addListener(value => fadeDuration = value);

group.addChild(new lightDesk.Label('Flash Interval (in frames):'));
const intervalControl = new lightDesk.SliderButton(intervalFrames, 1, 100, 1);
group.addChild(intervalControl);
intervalControl.addListener(value => intervalFrames = value);

const brightnessDisplay = new lightDesk.Label(`brightness: ${brightness}`);
group.addChild(brightnessDisplay);

/** Calculate the next frame */
function nextFrame() {
    setTimeout(nextFrame, 1000 / framerate);
    frame++;
    if (frame >= intervalFrames) {
        // Time for a flash
        frame = 0;
        brightness = 1;
    } else if (brightness >= 0) {
        // Decrease the brightness of the flash
        brightness -= (1 / fadeDuration);
        if (brightness < 0) brightness = 0;
    } else {
        // brightness has not changed
        return;
    }
    // Update the light desk display
    brightnessDisplay.setText(`brightness: ${brightness}`);
}

// Start sequence
setTimeout(nextFrame, 1000 / framerate);

