const lightDesk = require('@synesthesia-project/light-desk');

function buttonPressed() {
  console.log("The button was pressed!");
}

const desk = new lightDesk.LightDesk();

const group = new lightDesk.Group();
desk.setRoot(group);

const button = new lightDesk.Button("Hello World");
group.addChild(button);
button.addListener(buttonPressed);
