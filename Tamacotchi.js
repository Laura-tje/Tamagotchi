let canvas;

let sickness = {
  timerUntilSickness: null,
  barImage: null,
  isSick: null, //false
  barX: 250,
  barY: 20,
  barSize: 50,
  barScore: 100,
  barHeight: 50,
  medicineGiven: false,

  thermometerImage: null,
  thermometerSize: 80,
};

let currentlyDragging = "none";

let isDead = false; //false
let reloadTimer = 8; //8

let playingIsSet = false;
let feedingIsSet = false;

let room = {
  y: 490,
  current: 2,
  graveyard: null,
  bathroom: null,
  kitchen: null,
  bedroom: null,
  playroom: null,
  buttonForward: null,
  buttonBackward: null,
  lastRoom: 0,
}

let store = {
  openButton: null,
  button: null,
  buttonText: "<", //"≡"
  buttonBuyFly: null,
  buttonBuyWorms: null,
  buttonBuyMedicine: null,
  shown: false,
  buyFlyButton: null,
  buyWormsButton: null,
  buyMedicineButton: null,
}

let reloadButton;

let tamagotchi = {
  newName: null,
  name: "Tamagotchi",
  nameButton: null,
  nameField: null,
  nameFieldShown: false,
  image: null,
  x: 100,
  y: 150,
  size: 400
};
let coin = {
  image: null,
  amount: null,
  x: 5,
  y: 30,
  size: 50,
  //plus: 0,
  //minus: 0
};
let deaths = {
  image: null,
  amount: null,
  x: 5,
  y: 70,
  size: 50
}

//Variables - Bars
let energyBar = {
  name: "energy",
  image: null,
  x: 320,
  y: 20,
  size: 50,
  score: 100,
  height: 50,
};
let hungerBar = {
  name: "hunger",
  image: null,
  x: 390,
  y: 20,
  size: 50,
  score: 100,
  height: 50,
};
let happinessBar = {
  name: "happiness",
  image: null,
  x: 460,
  y: 20,
  size: 50,
  score: 100,
  height: 50,
};
let healthBar = {
  name: "health",
  image: null,
  x: 530,
  y: 20,
  size: 50,
  score: 100,
  height: 50,
};

//Variables - Icons
let foodIcon = {
  name: "food",
  image: null,
  x: 50,
  y: 400,
  size: 80,
  rollingMenu: false,

  flyName: "fly",
  flyImage: null,
  flyAmount: 3,
  flyX: 35, 
  flyY: 120,
  flySize: 100,
  flyPrice: 20,

  wormsName: "worms",
  wormsImage: null, 
  wormsAmount: 3,
  wormsX: 50,
  wormsY: 210,
  wormsSize: 70,  
  wormsPrice: 20,
  
  medicineName: "medicine",
  medicineImage: null,
  medicineAmount: 3,
  medicineX: 50, 
  medicineY: 300, 
  medicineSize: 80,
  medicinePrice: 90,
};
let sleepIcon = {
  name: "sleep",
  image: null,
  x: 475,
  y: 400,
  size: 90,
};
let playIcon = {
  name: "play",
  image: null,
  x: 100,
  y: 400,
  size: 80,
};
let cleanIcon = {
  name: "clean",
  image: null,
  x: 40,
  y: 400,
  size: 80,
};
let showerIcon = {
  name: "shower",
  image: null,
  x: 40,
  y: 300,
  size: 80,
  waterdrop: {
    image: null,
    size: 20,
    time: 0,
    x: [], 
    y: [],
  },
}

let bubbles = {
  time: 0,
  x: [],
  y: [],
  size: [],
}; 





//Other Functions (I do not know what name to give these)
function preload() {
  tamagotchi.image = loadImage("assets/frog2.png");
  coin.image = loadImage("assets/frogCoin.png");
  deaths.image = loadImage("assets/frogDeaths.png");
  sickness.barImage = loadImage("assets/virusBar.png");
  sickness.thermometerImage = loadImage("assets/thermometer.png");

  //Rooms
  room.graveyard = loadImage("assets/graveyard.png");
  room.bathroom = loadImage("assets/bathroom2.png");
  room.kitchen = loadImage("assets/kitchen.png");
  room.bedroom = loadImage("assets/bedroom.png");
  room.playroom = loadImage("assets/playroom.png");
  
  //Bars
  energyBar.image = loadImage("assets/energyBar.png");
  hungerBar.image = loadImage("assets/hungerBar.png");
  happinessBar.image = loadImage("assets/happinessBar.png");
  healthBar.image = loadImage("assets/healthBar.png");
  
  //Icons
  sleepIcon.image = loadImage("assets/sleepIcon.png");
  foodIcon.image = loadImage("assets/foodIcon2.png");
  foodIcon.flyImage = loadImage("assets/vliegImage.png")
  foodIcon.medicineImage = loadImage("assets/medicineImage.png")
  foodIcon.wormsImage = loadImage("assets/wormsImage.png")
  playIcon.image = loadImage("assets/playIcon.png");
  cleanIcon.image = loadImage("assets/cleanIcon.png");
  showerIcon.image = loadImage("assets/showerIcon.png");

  //waterDrops
  showerIcon.waterdrop.image = loadImage("assets/waterdrop.png");
}
function setup() {
  canvas = createCanvas(600, 500);
  
  createCanvas(600, 500);
  canvas.position(0, 0);

  tamagotchi.image.resize(tamagotchi.size, tamagotchi.size);
  coin.image.resize(coin.size, coin.size);
  deaths.image.resize(deaths.size, deaths.size);
  sickness.barImage.resize(sickness.barSize, sickness.barSize);
  sickness.thermometerImage.resize(sickness.thermometerSize, sickness.thermometerSize);

  room.graveyard.resize(600, 500);
  room.bathroom.resize(600, 500);
  room.kitchen.resize(600, 500);
  room.bedroom.resize(600, 500);
  room.playroom.resize(600, 500);

  let storedName = localStorage.getItem("tamagotchi.name");
  if (storedName) {
    tamagotchi.name = storedName;
  }

  drawRenameButton();  
  drawReloadButton();
  drawStoreButton();
  drawStoreOpenButton();
  drawBuyFlyButton();
  drawBuyWormsButton();
  drawBuyMedicineButton();
  drawRoomButtons();

  sickness.barScore = localStorage.getItem("sickness.barScore") ? parseFloat(localStorage.getItem("sickness.barScore")) : 100;
  sickness.isSick = localStorage.getItem("sickness.isSick") ? parseFloat(localStorage.getItem("sickness.isSick")) : false;
  sickness.timerUntilSickness = localStorage.getItem("sickness.timerUntilSickness") ? parseFloat(localStorage.getItem("sickness.timerUntilSickness")) : 300;

  foodIcon.flyAmount = localStorage.getItem("foodIcon.flyAmount") ? parseFloat(localStorage.getItem("foodIcon.flyAmount")) : 3;
  foodIcon.wormsAmount = localStorage.getItem("foodIcon.wormsAmount") ? parseFloat(localStorage.getItem("foodIcon.wormsAmount")) : 3;
  foodIcon.medicineAmount = localStorage.getItem("foodIcon.medicineAmount") ? parseFloat(localStorage.getItem("foodIcon.medicineAmount")) : 3;

  tamagotchi.name = localStorage.getItem("tamagotchi.name") || "Tamagotchi";
  energyBar.score = localStorage.getItem("energyBar.score") ? parseFloat(localStorage.getItem("energyBar.score")) : 100;
  hungerBar.score = localStorage.getItem("hungerBar.score") ? parseFloat(localStorage.getItem("hungerBar.score")) : 100;
  happinessBar.score = localStorage.getItem("happinessBar.score") ? parseFloat(localStorage.getItem("happinessBar.score")) : 100;
  healthBar.score = localStorage.getItem("healthBar.score") ? parseFloat(localStorage.getItem("healthBar.score")) : 100;
  
  coin.amount = localStorage.getItem("coin.amount") ? parseFloat(localStorage.getItem("coin.amount")) : 100;
  deaths.amount = localStorage.getItem("deaths.amount") ? parseFloat(localStorage.getItem("deaths.amount")) : 0;

  //Bars
  energyBar.image.resize(energyBar.size + 10, energyBar.size + 10);
  hungerBar.image.resize(hungerBar.size, hungerBar.size);
  happinessBar.image.resize(happinessBar.size - 5, happinessBar.size - 5);
  healthBar.image.resize(healthBar.size - 5, healthBar.size - 5);
  
  //Icons
  sleepIcon.image.resize(sleepIcon.size, sleepIcon.size);
  foodIcon.image.resize(foodIcon.size, foodIcon.size);
  foodIcon.flyImage.resize(foodIcon.flySize, foodIcon.flySize);
  foodIcon.medicineImage.resize(foodIcon.medicineSize, foodIcon.medicineSize);
  foodIcon.wormsImage.resize(foodIcon.wormsSize, foodIcon.wormsSize);
  playIcon.image.resize(playIcon.size, playIcon.size);
  cleanIcon.image.resize(cleanIcon.size, cleanIcon.size);
  showerIcon.image.resize(showerIcon.size, showerIcon.size);

  showerIcon.waterdrop.image.resize(showerIcon.waterdrop.size, showerIcon.waterdrop.size);
  
  drawRoom();
}
function isNowDead() {
  if (room.lastRoom == 0) {
    room.lastRoom = room.current;
    room.current = 0;
  }

  tamagotchi.nameButton.hide();    
  reloadButton.hide();
  store.button.hide();
  store.openButton.hide();
  store.buttonBuyFly.hide();
  store.buttonBuyWorms.hide();
  store.buttonBuyMedicine.hide();
  room.buttonForward.hide();
  room.buttonBackward.hide();
  //tamagotchi.nameField.hide();

  if (reloadTimer == 8) { //logs the cause of death to the console :)
    if (energyBar.score <= 0) {
      console.log("%cDied of lack of energy...", "color: red;");
    }
    if (hungerBar.score <= 0) {
      console.log("%cDied of lack of food...", "color: red;");
    }
    if (happinessBar.score <= 0) {
      console.log("%cDied of sadness...", "color: red;");
    }
    if (healthBar.score <= 0) {
      console.log("%cDied of lack of health...", "color: red;");
    }
    if (sickness.isSick) {
      console.log("%cDied of sickness...", "color: red;");
    }
  }
  reloadTimer -= deltaTime / 1000;
  if (round(reloadTimer) <= 8 && round(reloadTimer) > 0) {
    textSize(20);
    fill("red");
    strokeWeight(1);
    stroke("red");
    textAlign(CENTER);
    if (energyBar.score <= 0) {
      text(`${tamagotchi.name} died of lack of energy...`, 300, tamagotchi.y + 50);
    } else if (hungerBar.score <= 0) {
      text(`${tamagotchi.name} died of hunger...`,  300, tamagotchi.y + 50);
    } else if (happinessBar.score <= 0) {
      text(`${tamagotchi.name} died of sadness...`,  300, tamagotchi.y + 50);
    } else if (healthBar.score <= 0) {
      text(`${tamagotchi.name} died of being too unhealthy...`,  300, tamagotchi.y + 50);
    } else if (sickness.isSick) {
      text(`${tamagotchi.name} died of an unknown disease...`,  300, tamagotchi.y + 50);
    }
    textAlign(LEFT);

    image(tamagotchi.image, tamagotchi.x, tamagotchi.y);
  
    fill(196, 221, 138); //green
    strokeWeight(0);
    rect(tamagotchi.x + 185, tamagotchi.y + 145, 30, 20); //Mouth
    ellipse(tamagotchi.x + 149, tamagotchi.y + 149, 32, 32); //Eye
    ellipse(tamagotchi.x + 253, tamagotchi.y + 150, 32, 32); //Eye
    
    eyesDead();
  
    arc(tamagotchi.x + 200, tamagotchi.y + 170, 20, 10, radians(190), radians(-10));

    if (reloadTimer <= 5 && reloadTimer > 0) {
      textSize(20);
      fill("red");
      strokeWeight(1);
      stroke("red");
      text("Restarting in: " + round(reloadTimer), tamagotchi.x + 140, tamagotchi.y + 80);
    }
  } else if (round(reloadTimer) <= 0) {
    energyBar.score = 100;
    hungerBar.score = 100;
    happinessBar.score = 100;
    healthBar.score = 100;
    isDead = false;      
    reloadTimer = 8;
    if (sickness.isSick) {
      sickness.timerUntilSickness = 300; //5 minuten
    }
    sickness.isSick = false;
    sickness.barScore = 100;    
    deaths.amount += 1;
    room.current = room.lastRoom; //this has to be something different but idk what!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    room.lastRoom = 0;
    bubbles.x = [];
    bubbles.y = [];
    bubbles.size = [];
  }
}

//Rooms
function drawRoom() {
  //background(135, 206, 265); //this has to go eventually

  stroke(93, 51, 48); //brown
  strokeWeight(3);
  fill(160, 110, 86); //brown
  textSize(30);
  textAlign(CENTER);
  if (room.current == 0) {
    image(room.graveyard, 0, 0);
    room.buttonForward.hide();
    room.buttonBackward.hide();
  } else if (room.current == 1) {
    drawBathroom();
    room.buttonForward.show();
    room.buttonBackward.show();
    text("Bathroom", 300, room.y);
  } else if (room.current == 2) {
    drawBedroom();
    room.buttonForward.show();
    room.buttonBackward.show();
    text("Bedroom", 300, room.y);
  } else if (room.current == 3) {
    drawKitchen();
    room.buttonForward.show();
    room.buttonBackward.show();
    text("Kitchen", 300, room.y);
  } else if (room.current == 4) {
    drawPlayroom();
    room.buttonForward.show();
    room.buttonBackward.show();
    text("Outside", 300, room.y);
  }
  textAlign(LEFT);
}

function drawRoomButtons() {
  room.buttonForward = createButton(">");
  room.buttonForward.position(370, room.y - 23);
  room.buttonForward.size(25, 25)
  room.buttonForward.mousePressed(buttonRoomForward);
  room.buttonForward.style("background-color", "#a06e56");
  room.buttonForward.style("border-color", "#5d3330");
  room.buttonForward.style("border-radius", "5px");
  room.buttonForward.style("color", "#5d3330");
  room.buttonForward.style("padding", "0");
  room.buttonForward.style("text-align", "center");
  room.buttonForward.style("font-weight", "bold");

  room.buttonBackward = createButton("<");
  room.buttonBackward.position(205, room.y - 23);
  room.buttonBackward.size(25, 25)
  room.buttonBackward.mousePressed(buttonRoomBackward);
  room.buttonBackward.style("background-color", "#a06e56");
  room.buttonBackward.style("border-color", "#5d3330");
  room.buttonBackward.style("border-radius", "5px");
  room.buttonBackward.style("color", "#5d3330");
  room.buttonBackward.style("padding", "0");
  room.buttonBackward.style("text-align", "center");
  room.buttonBackward.style("font-weight", "bold");
}

function buttonRoomBackward() {
  if (room.current != 0 && room.current != 1) {
    room.current -= 1;
  } else if (room.current == 1) {
    room.current = 4;
  }
}
function buttonRoomForward() {
  if (room.current != 0 && room.current != 4) {
    room.current += 1;
  } else if (room.current == 4) {
    room.current = 1;
  }
}

function drawBathroom() {
  image(room.bathroom, 0, 0);
}
function drawBedroom() {
  image(room.bedroom, 0, 0);
}
function drawKitchen() {
  image(room.kitchen, 0, 0);
}
function drawPlayroom() {
  image(room.playroom, 0, 0);
}


//Frog
function drawFrog() {
  image(tamagotchi.image, tamagotchi.x, tamagotchi.y);
  
  mouthHappy();
  eyesOpen();
  
  if (currentlyDragging == "none") {
    //bubbles = [];
  }
  if (currentlyDragging == playIcon.name) {

  }

  if (energyBar.score < 50) {
    mouthUnhappy();    
    tiredLook();
  }
  if (hungerBar.score < 50) {
    mouthUnhappy();    
    hungerLook();
  }
  if (happinessBar.score < 50) {
    mouthUnhappy();
  }
  if (healthBar.score < 50) {    
    mouthUnhappy();
    dirtyLook();
  }

  
  if (foodIcon.flyAmount > 0 && currentlyDragging == foodIcon.flyName && foodIcon.rollingMenu) {
    mouthOpen()
    if (mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
      tongueFollow(isNowFeeding)
    }
  }
  if (foodIcon.wormsAmount > 0 && currentlyDragging == foodIcon.wormsName && foodIcon.rollingMenu) {
    mouthOpen();
    if (mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
      tongueFollow(isNowFeeding)
    }
  }

  if (sickness.isSick) {
    sickLook();
  }

  if (foodIcon.medicineAmount > 0 && currentlyDragging == foodIcon.medicineName && foodIcon.rollingMenu) {
    mouthOpen();
    if (mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
      tongueFollow(isNowFeedingMedicine)
    }
  }
  if (currentlyDragging == sleepIcon.name && mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
    isNowSleeping();
    eyesClosed();

    fill(93, 51, 48); //brown
    stroke(93, 51, 48); //brown
    strokeWeight(1);
    textSize(20);
    text("Z", tamagotchi.x + 280, tamagotchi.y + 130);
    textSize(30);
    text("Z", tamagotchi.x + 300, tamagotchi.y + 110);
    textSize(40);
    text("Z", tamagotchi.x + 325, tamagotchi.y + 90);
  }
  if (currentlyDragging == cleanIcon.name) {
    if (mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
      isNowCleaning();
      eyesClosed();    
      bubbles.time += deltaTime / 1000;
      if (bubbles.time >= 0.1) {
        bubbles.x.push(mouseX);
        bubbles.y.push(mouseY);
        bubbles.size.push(random(10, 40))
        bubbles.time = 0;
      }
    }
  }
  if (currentlyDragging == showerIcon.name) {
    if (mouseX > (tamagotchi.x + (tamagotchi.size * 0.25)) && mouseX < (tamagotchi.x + (tamagotchi.size * 0.75)) && mouseY > (tamagotchi.y + (tamagotchi.size * 0.25)) && mouseY < (tamagotchi.y + (tamagotchi.size * 0.75))) {
      eyesClosed();  
      bubbles.time += deltaTime / 1000;
      if (bubbles.time >= 0.05) {  
        bubbles.x.shift();
        bubbles.y.shift();
        bubbles.size.shift();
        bubbles.time = 0;
      }
    }
  }
  if (bubbles) {
    cleaningLook();
  }
  if (currentlyDragging == showerIcon.name) {
    isNowShowering();
  }
}


function sickLook() {
  //Eyes
  //Eyes half closed
  strokeWeight(0);
  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 133, tamagotchi.y + 132, 30, 15)  
  rect(tamagotchi.x + 236, tamagotchi.y + 132, 30, 15)
  stroke(93, 51, 48); //brown   
  strokeWeight(2); 
  
  arc(tamagotchi.x + 149, tamagotchi.y + 145, 30, 15, radians(10), radians(170))
  arc(tamagotchi.x + 252, tamagotchi.y + 145, 30, 15, radians(10), radians(170))
  
  //Under the eye
  strokeWeight(2);
  stroke(93, 51, 48); //brown
  noFill();
  arc(tamagotchi.x + 149, tamagotchi.y + 160, 23, 15, radians(10), radians(170))
  arc(tamagotchi.x + 253, tamagotchi.y + 160, 23, 15, radians(10), radians(170))
  
  //mouth
  if (currentlyDragging == "none" || currentlyDragging == playIcon.name || currentlyDragging == cleanIcon.name || currentlyDragging == sleepIcon.name || currentlyDragging == foodIcon.name ||
      currentlyDragging == foodIcon.flyName && foodIcon.flyAmount == 0 ||
      currentlyDragging == foodIcon.wormsName && foodIcon.wormsAmount == 0 ||
      currentlyDragging == foodIcon.medicineName && foodIcon.medicineAmount == 0 ) {
    fill(196, 221, 138); //green
    strokeWeight(0);
    rect(tamagotchi.x + 170, tamagotchi.y + 145, 60, 50);
    image(sickness.thermometerImage, tamagotchi.x + 80, tamagotchi.y + 125);
    
    fill(196, 221, 138); //green
    stroke(93, 51, 48); //brown   
    strokeWeight(2);
    arc(tamagotchi.x + 160, tamagotchi.y + 205, 30, 30, radians(170), radians(-80))
  }


}

function cleaningLook() {
  for (let i = 0; i < bubbles.x.length; i += 1) {
      fill(173, 216, 230, 150); // Light blue with some transparency
      //stroke(93, 51, 48, 150);
      stroke(230, 150);
      circle(bubbles.x[i], bubbles.y[i], bubbles.size[i]); // Draw the bubble    
      console.log("bubble")    
    
  }
}
function hungerLook() {
  noFill();
  strokeWeight(2);
  stroke(93, 51, 48, 150) //Brown
  
  arc(tamagotchi.x + 175, tamagotchi.y + 250, 15, 10, radians(180), radians(0));
  arc(tamagotchi.x + 190, tamagotchi.y + 250, 15, 10, radians(0), radians(180));
  arc(tamagotchi.x + 205, tamagotchi.y + 250, 15, 10, radians(180), radians(0));
  arc(tamagotchi.x + 220, tamagotchi.y + 250, 15, 10, radians(0), radians(180));

  arc(tamagotchi.x + 180, tamagotchi.y + 270, 15, 10, radians(180), radians(0));
  arc(tamagotchi.x + 195, tamagotchi.y + 270, 15, 10, radians(0), radians(180));
  arc(tamagotchi.x + 210, tamagotchi.y + 270, 15, 10, radians(180), radians(0));
  arc(tamagotchi.x + 225, tamagotchi.y + 270, 15, 10, radians(0), radians(180));
}
function tiredLook() {
  //Eyes half closed
  strokeWeight(0);

  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 133, tamagotchi.y + 132, 30, 15)  
  rect(tamagotchi.x + 236, tamagotchi.y + 132, 30, 15)
  stroke(93, 51, 48); //brown   
  strokeWeight(2); 
  arc(tamagotchi.x + 149, tamagotchi.y + 145, 30, 15, radians(10), radians(170))
  arc(tamagotchi.x + 252, tamagotchi.y + 145, 30, 15, radians(10), radians(170))

  //Under the eye
  strokeWeight(2);
  stroke(93, 51, 48); //brown
  noFill();
  arc(tamagotchi.x + 149, tamagotchi.y + 160, 23, 15, radians(10), radians(170))
  arc(tamagotchi.x + 253, tamagotchi.y + 160, 23, 15, radians(10), radians(170))
}
function dirtyLook() {
  const dirtSpots = [
    [tamagotchi.x + 105, tamagotchi.y + 210, 20, 50, 10, 100],
    [tamagotchi.x + 210, tamagotchi.y + 230, 50, 30, 10, 120],
    [tamagotchi.x + 285, tamagotchi.y + 250, 35, 40, 50, 130],
    [tamagotchi.x + 150, tamagotchi.y + 250, 30, 20, 15, 110],  
    [tamagotchi.x + 285, tamagotchi.y + 190, 40, 25, 60, 90],      
  ];
  
  for (let i = 0; i < dirtSpots.length; i += 1) {
    const [x, y, w, h, rot, opacity] = dirtSpots[i];
    fill(93, 51, 48, opacity)
    noStroke();
    push();
    translate(x, y);
    rotate(radians(rot));
    ellipse(0, 0, w, h);
    pop();
  }

  const splatters = [
    [tamagotchi.x + 130, tamagotchi.y + 220, 10, 10, 0, 80],
    [tamagotchi.x + 220, tamagotchi.y + 200, 15, 15, 0, 90],
    [tamagotchi.x + 270, tamagotchi.y + 280, 8, 8, 0, 70],
    [tamagotchi.x + 180, tamagotchi.y + 260, 12, 12, 0, 85],
    [tamagotchi.x + 190, tamagotchi.y + 150, 10, 10, 0, 75]
  ];

  for (let i = 0; i < splatters.length; i += 1) {
    const [x, y, w, h, rot, opacity] = splatters[i];
    fill(93, 51, 48, opacity);
    noStroke();
    push();
    translate(x, y);
    rotate(radians(rot));
    ellipse(0, 0, w, h);
    pop();
  }
}

function mouthOpen() {
  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 170, tamagotchi.y + 145, 60, 50);

  fill(30);
  strokeWeight(2);
  stroke(93, 51, 48); //brown
  ellipse(tamagotchi.x + 200, tamagotchi.y + 180, 50, 20);

  fill(234, 150, 230); //pink
  strokeWeight(0);
  ellipse(tamagotchi.x + 200, tamagotchi.y + 186, 20, 5);
}
function mouthHappy() {
  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 170, tamagotchi.y + 145, 60, 50);

  noFill();
  strokeWeight(2);
  stroke(93, 51, 48); //brown
  arc(tamagotchi.x + 200, tamagotchi.y + 180, 50, 20, 0, radians(180))
}
function mouthNeutral() {
  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 170, tamagotchi.y + 145, 60, 50);
  //neutral mouth
}
function mouthUnhappy() {
  fill(196, 221, 138); //green
  strokeWeight(0);
  rect(tamagotchi.x + 170, tamagotchi.y + 145, 60, 50);

  noFill();
  strokeWeight(2);
  stroke(93, 51, 48); //brown
  arc(tamagotchi.x + 200, tamagotchi.y + 180, 50, 20, radians(180), radians(0))
}

function eyesClosed() {
  strokeWeight(0);
  fill(196, 221, 138); //green
  ellipse(tamagotchi.x + 149, tamagotchi.y + 149, 32, 32);
  ellipse(tamagotchi.x + 253, tamagotchi.y + 150, 32, 32); 

  strokeWeight(2.5);
  stroke(93, 51, 48); //brown
  noFill();
  arc(tamagotchi.x + 149, tamagotchi.y + 145, 23, 30, radians(10), radians(170))
  arc(tamagotchi.x + 252, tamagotchi.y + 145, 23, 30, radians(10), radians(170))
}
function eyesOpen() {

}
function eyesDead() {
  strokeWeight(3);
  stroke(93, 51, 48); //brown
  line(tamagotchi.x + 135, tamagotchi.y + 145, tamagotchi.x + 160, tamagotchi.y + 135); //left eye
  line(tamagotchi.x + 135, tamagotchi.y + 135, tamagotchi.x + 160, tamagotchi.y + 145); //left eye
  
  line(tamagotchi.x + 240, tamagotchi.y + 145, tamagotchi.x + 265, tamagotchi.y + 135); //right eye
  line(tamagotchi.x + 240, tamagotchi.y + 135, tamagotchi.x + 265, tamagotchi.y + 145); //right eye
}

function tongueFollow(whatIsFed) {
    strokeWeight(5);
    stroke(234, 150, 230); //pink
    line(tamagotchi.x + 200, tamagotchi.y + 186, mouseX, mouseY);
    stroke(93, 51, 48); //brown

    if(feedingIsSet == false) {
      setTimeout(whatIsFed, 100);
      feedingIsSet = true;
    }
}


//Store
function drawStore() {
  if (!store.shown) {
    store.button.show();
  } else if (store.shown) {
    store.openButton.show();
  }

  if (room.current == 3) {
    if (store.shown) {
      store.openButton.show();
      strokeWeight(5);
      stroke(93, 51, 48); //brown
      fill(249, 224, 160);
      rect(450, 110, 155, 230);
  
      strokeWeight(5);
      stroke(93, 51, 48); //brown
      line(450, 150, 600, 150);
  
      //Store Titel
      strokeWeight(1);
      stroke(93, 51, 48); //brown
      fill(93, 51, 48); //brown
      textSize(30);
      text("Store", 500, 140);
  
      //Fly
      image(foodIcon.flyImage, 455, 165, foodIcon.flySize / 2, foodIcon.flySize / 2);
      textSize(20);
      text(`= ${foodIcon.flyPrice}`, 500, 200)
      image(coin.image, 535, 175, coin.size / 1.5, coin.size / 1.5);
      
      //Worms
      image(foodIcon.wormsImage, 460, 220, foodIcon.wormsSize / 2, foodIcon.wormsSize / 2);
      textSize(20);
      text(`= ${foodIcon.wormsPrice}`, 500, 250)
      image(coin.image, 535, 225, coin.size / 1.5, coin.size / 1.5);
      
      //Medicine
      image(foodIcon.medicineImage, 460, 270, foodIcon.medicineSize / 2, foodIcon.medicineSize / 2);
      textSize(20);
      text(`= ${foodIcon.medicinePrice}`, 500, 300)
      image(coin.image, 535, 275, coin.size / 1.5, coin.size / 1.5);
  
      store.buttonBuyFly.show();
      store.buttonBuyWorms.show();
      store.buttonBuyMedicine.show();
    } else if (!store.shown) {
      store.button.show();
      strokeWeight(5);
      stroke(93, 51, 48); //brown
      fill(249, 224, 160);
      rect(580, 110, 25, 230);
  
      strokeWeight(5);
      stroke(93, 51, 48); //brown
      line(580, 150, 600, 150);
  
      image(foodIcon.flyImage, 585, 165, foodIcon.flySize / 2, foodIcon.flySize / 2);
      image(foodIcon.wormsImage, 590, 220, foodIcon.wormsSize / 2, foodIcon.wormsSize / 2);
      image(foodIcon.medicineImage, 590, 270, foodIcon.medicineSize / 2, foodIcon.medicineSize / 2);
  
      store.buttonBuyFly.hide();
      store.buttonBuyWorms.hide();
      store.buttonBuyMedicine.hide();
    }
  } else {
    store.buttonBuyFly.hide();
    store.buttonBuyWorms.hide();
    store.buttonBuyMedicine.hide();

    store.button.hide();
    store.openButton.hide();
  }
}

function drawStoreButton() {
  store.button = createButton(store.buttonText);
  store.button.position(565, 107.5);
  store.button.size(15, 235)
  store.button.mousePressed(storeShown);
  store.button.style("background-color", "#5d3330");
  store.button.style("border", "#5d3330");

  store.button.style("color", "#f9e0a0");

  store.button.style("padding", "0")
  store.button.style("text-align", "center")
}
function drawStoreOpenButton() {
  store.openButton = createButton(">");
  store.openButton.position(435, 107.5);
  store.openButton.size(15, 235)
  store.openButton.mousePressed(storeShown);
  store.openButton.style("background-color", "#5d3330");
  store.openButton.style("border", "#5d3330");

  store.openButton.style("color", "#f9e0a0");

  store.openButton.style("padding", "0")
  store.openButton.style("text-align", "center")

}

function drawBuyFlyButton() {
  store.buttonBuyFly = createButton("+");
  store.buttonBuyFly.position(570, 180);
  store.buttonBuyFly.mousePressed(buyFly);
  store.buttonBuyFly.style("color", "#f9e0a0");
  store.buttonBuyFly.style("background-color", "#5d3330");
}
function drawBuyWormsButton() {
  store.buttonBuyWorms = createButton("+");
  store.buttonBuyWorms.position(570, 230);
  store.buttonBuyWorms.mousePressed(buyWorms);
  store.buttonBuyWorms.style("color", "#f9e0a0");
  store.buttonBuyWorms.style("background-color", "#5d3330");
}
function drawBuyMedicineButton() {
  store.buttonBuyMedicine = createButton("+");
  store.buttonBuyMedicine.position(570, 280);
  store.buttonBuyMedicine.mousePressed(buyMedicine);
  store.buttonBuyMedicine.style("color", "#f9e0a0");
  store.buttonBuyMedicine.style("background-color", "#5d3330");
}

function storeShown() {
  if (store.shown) {
    store.shown = false;
  } else if (!store.shown) {
    store.shown = true;
  }
}

function buyFly() {
  if (coin.amount >= foodIcon.flyPrice) {
    foodIcon.flyAmount += 1;
    coin.amount -= foodIcon.flyPrice;
  }
}
function buyWorms() {
  if (coin.amount >= foodIcon.wormsPrice) {
    foodIcon.wormsAmount += 1;
    coin.amount -= foodIcon.wormsPrice;
  }
}
function buyMedicine() {
  if (coin.amount >= foodIcon.medicinePrice) {
    foodIcon.medicineAmount += 1;
    coin.amount -= foodIcon.medicinePrice;
  }
}



//Coins
function drawCoins() {
  image(coin.image, coin.x, coin.y);

  strokeWeight(1.5);
  stroke(93, 51, 48); //brown
  fill(93, 51, 48); //brown
  textSize(20)
  text(":  " + floor(coin.amount), coin.x + 45, coin.y + 32);

  //if (coin.plus > 0 || coin.minus <= coin.amount) {
  //  coin.amount += coin.plus;
  //  coin.amount -= coin.minus;
  //  coin.plus = 0;
  //  coin.minus = 0;
  //}

  localStorage.setItem("coin.amount", coin.amount);
}


//Deaths
function drawDeaths() {
  image(deaths.image, deaths.x, deaths.y);

  strokeWeight(1.5);
  stroke(93, 51, 48); //brown
  fill(93, 51, 48); //brown
  textSize(20)
  text(":  " + floor(deaths.amount), deaths.x + 45, deaths.y + 32);

  localStorage.setItem("deaths.amount", deaths.amount);
}


//sickness
function drawSickness() {
  if (sickness.isSick && !sickness.medicineGiven) {
    drawSicknessBar();
    sickness.isSick = true
  } else if (sickness.isSick && sickness.medicineGiven) {

    sickness.isSick = false;
    //sickness.timerUntilSickness = 300;
  } else if (!sickness.isSick && !sickness.medicineGiven) {

    sicknessUntilTimer();
  } else if (!sickness.isSick && sickness.medicineGiven) {
    drawSicknessBar();
    sickness.isSick = true;
  }
}

function drawSicknessBar() {
  //console.log("sickness.barScore: " + round(sickness.barScore));
  strokeWeight(0);
  fill(0, 100);
  rect(sickness.barX, sickness.barY, sickness.barSize, sickness.barSize, 5);
  fill(196, 221, 138);
  strokeWeight(0);
  rect(sickness.barX, sickness.barY, sickness.barSize, sickness.barHeight, 5);
  strokeWeight(3);
  stroke(0);
  noFill();
  rect(sickness.barX, sickness.barY, sickness.barSize, sickness.barSize, 5);
  image(sickness.barImage, sickness.barX, sickness.barY);

  scoreBarFillingSickness(); 
}
function scoreBarFillingSickness() {
  if (sickness.isSick) {
    if (sickness.barScore <= 0) {
      isDead = true;
      //sickness.barHeight = 100;
    }

    if (sickness.timerUntilSickness < 0) {
      sickness.barScore = 100; 
      sickness.isSick = true;
      //sickness.timerUntilSickness = 10;
    }
  
    sickness.barScore -= (deltaTime / 300) * (100 / sickness.barSize);
    sickness.barHeight = sickness.barScore / (100 / sickness.barSize);
  }

  localStorage.setItem("sickness.barScore", sickness.barScore);
}
function sicknessUntilTimer() {
  if (!sickness.isSick) {
    sickness.timerUntilSickness -= (deltaTime/1000)
  }
  
  if (sickness.timerUntilSickness < 1 && !isDead) {
    sickness.isSick = true;
    sickness.timerUntilSickness = 300;
    sickness.barScore = 100;
  }

  localStorage.setItem("sickness.isSick", sickness.isSick);
  localStorage.setItem("sickness.timerUntilSickness", sickness.timerUntilSickness);
  //console.log("sickness timer: " + round(sickness.timerUntilSickness));
}


//restart
function drawReloadButton() {
  reloadButton = createButton("Reset game");
  reloadButton.position(10, 10);
  reloadButton.mousePressed(restart);
}

function restart() {
  coin.amount = 100;
  deaths.amount = 0;
  tamagotchi.name = "Tamagotchi";

  sickness.timerUntilSickness = 300;
  sickness.isSick = false;

  foodIcon.flyAmount = 3;
  foodIcon.wormsAmount = 3;
  foodIcon.medicineAmount = 3;

  energyBar.score = 100;
  hungerBar.score = 100;
  happinessBar.score = 100;
  healthBar.score = 100;

  localStorage.setItem("coin.amount", coin.amount);
  localStorage.setItem("deaths.amount", deaths.amount);
  localStorage.setItem("tamagotchi.name", tamagotchi.name);

  localStorage.setItem("sickness.timerUntilSickness", sickness.timerUntilSickness);
  localStorage.setItem("sickness.isSick", sickness.isSick);

  localStorage.setItem("foodIcon.flyAmount", foodIcon.flyAmount);
  localStorage.setItem("foodIcon.wormsAmount", foodIcon.wormsAmount);
  localStorage.setItem("foodIcon.medicineAmount", foodIcon.medicineAmount);
  
  localStorage.setItem("energyBar.score", energyBar.score);
  localStorage.setItem("hungerBar.score", hungerBar.score);
  localStorage.setItem("happinessBar.score", happinessBar.score);
  localStorage.setItem("healthBar.score", healthBar.score);
}


//Name
function drawName() {
  stroke(93, 51, 48); //brown
  strokeWeight(3);
  fill(160, 110, 86); //brown
  textSize(30);

  if (!tamagotchi.nameFieldShown) {
    textAlign(CENTER);
    text(tamagotchi.name, tamagotchi.x + 200, tamagotchi.y + 85);
    textAlign(LEFT);
  }
}

function drawRenameButton() {
  tamagotchi.nameButton = createButton("Rename Tamagotchi");
  tamagotchi.nameButton.position(100, 10);
  tamagotchi.nameButton.mousePressed(showNameInput);
}
function showNameInput() { 
  if (!tamagotchi.nameFieldShown) {
    tamagotchi.nameFieldShown = true;
    tamagotchi.nameField = createInput();
    tamagotchi.nameField.style("text-align", "center");
    tamagotchi.nameField.position((width/2) - 52.5, tamagotchi.y + 60);
    tamagotchi.nameField.size(100, 30);
    tamagotchi.nameField.show();
  }
}
function keyPressed() {
  if (keyCode === ENTER && tamagotchi.nameFieldShown == true) {
    tamagotchi.newName = tamagotchi.nameField.value()
    tamagotchi.nameField.hide();
    tamagotchi.name = tamagotchi.newName;
    localStorage.setItem("tamagotchi.name", tamagotchi.name);
    tamagotchi.nameFieldShown = false;
  }
}


//Bars
function drawBars() {
  stroke(0, 0, 0);
  strokeWeight(3);
  
  //Energy
  strokeWeight(0);
  fill(0, 100);
  rect(energyBar.x, energyBar.y, energyBar.size, energyBar.size, 5);
  colorOfBar(energyBar.score); 
  rect(energyBar.x, energyBar.y, energyBar.size, energyBar.height, 5);
  strokeWeight(3);
  noFill();
  rect(energyBar.x, energyBar.y, energyBar.size, energyBar.size, 5);
  image(energyBar.image, energyBar.x - 5, energyBar.y - 5);
  scoreBarFillingEnergy();
  
  //Hunger
  strokeWeight(0);
  fill(0, 100);
  rect(hungerBar.x, hungerBar.y, hungerBar.size, hungerBar.size, 5);
  colorOfBar(hungerBar.score);
  rect(hungerBar.x, hungerBar.y, hungerBar.size, hungerBar.height, 5);
  strokeWeight(3);
  noFill();
  rect(hungerBar.x, hungerBar.y, hungerBar.size, hungerBar.size, 5);
  image(hungerBar.image, hungerBar.x, hungerBar.y);
  scoreBarFillingHunger();
  
  //Happiness
  strokeWeight(0);
  fill(0, 100);
  rect(happinessBar.x, happinessBar.y, happinessBar.size, happinessBar.size, 5);
  colorOfBar(happinessBar.score);
  rect(happinessBar.x, happinessBar.y, happinessBar.size, happinessBar.height, 5);
  strokeWeight(3);
  noFill();
  rect(happinessBar.x, happinessBar.y, happinessBar.size, happinessBar.size, 5);
  image(happinessBar.image, happinessBar.x + 2.5, happinessBar.y + 2.5);
  scoreBarFillingHappiness();
  
  //Health
  strokeWeight(0);
  fill(0, 100);
  rect(healthBar.x, healthBar.y, healthBar.size, healthBar.size, 5);
  colorOfBar(healthBar.score);
  rect(healthBar.x, healthBar.y, healthBar.size, healthBar.height, 5);
  strokeWeight(3);
  noFill();
  rect(healthBar.x, healthBar.y, healthBar.size, healthBar.size, 5);
  image(healthBar.image, healthBar.x + 2.5, healthBar.y + 2.5);
  scoreBarFillingHealth();

  showPercentage();
}

function isNowFeeding() {
  if (currentlyDragging == foodIcon.flyName) {
    if (foodIcon.flyAmount > 0) {
      if (hungerBar.score < 97) {
        hungerBar.score += 10;
        energyBar.score += 10;
      } else if (hungerBar.score > 97) {
        healthBar.score -= 5;
        hungerBar.score += 3;
        energyBar.score += 5;
      }
      foodIcon.flyAmount -= 1;
    } else {
      //coin.amount -= 2 * foodIcon.flyPrice;
    }
  } else if (currentlyDragging == foodIcon.wormsName) {
    if (foodIcon.wormsAmount > 0) {
      if (hungerBar.score < 97) {
        hungerBar.score += 10;
        energyBar.score += 10;
      } else if (hungerBar.score > 97) {
        healthBar.score -= 5;
        hungerBar.score += 3;
        energyBar.score += 5;
      }
      foodIcon.wormsAmount -= 1;
      } else {
        //coin.amount -= 2 * foodIcon.wormsPrice;
      }
    }
    
  localStorage.setItem("hungerBar.score", hungerBar.score);
  localStorage.setItem("energyBar.score", energyBar.score);
  localStorage.setItem("healthBar.score", healthBar.score);
  localStorage.setItem("foodIcon.flyAmount", foodIcon.flyAmount);
  localStorage.setItem("foodIcon.wormsAmount", foodIcon.wormsAmount);
  localStorage.setItem("coin.amount", coin.amount);
  
  feedingIsSet = false;
  currentlyDragging = "none";
}
function isNowFeedingMedicine() {
  
  if (foodIcon.medicineAmount > 0) {
    foodIcon.medicineAmount -= 1;
    if (sickness.isSick == true) {
      sickness.isSick = false;
      sickness.medicineGiven = true;
      sickness.timerUntilSickness = 300;
      sickness.barScore = 100;
      sicknessUntilTimer();
    } else {
      sickness.barScore = 100;
      sickness.isSick = true;
      sickness.medicineGiven = true;
      drawSicknessBar();
    }
  } else {
    //coin.amount -= 2 * foodIcon.medicinePrice;
  }

  localStorage.setItem("foodIcon.medicineAmount", foodIcon.medicineAmount);
  localStorage.setItem("coin.amount", coin.amount);
  
  feedingIsSet = false;
  currentlyDragging = "none";  
  sickness.medicineGiven = false;
}
function isNowPlaying() {
  happinessBar.score += 5;
  energyBar.score -= 3;

  localStorage.setItem("happinessBar.score", happinessBar.score);
  localStorage.setItem("energyBar.score", energyBar.score);

  playingIsSet = false;
  currentlyDragging = "none";
  coin.amount += 5;
}
function isNowSleeping() { 
  healthBar.score += 5 * (deltaTime / 1000);
  energyBar.score += 5 * (deltaTime / 1000);
  hungerBar.score -= 1.5 * (deltaTime / 1000);

  localStorage.setItem("healthBar.score", healthBar.score);
  localStorage.setItem("energyBar.score", energyBar.score);
  localStorage.setItem("hungerBar.score", hungerBar.score);

  if (energyBar.score > 99 && healthBar.score > 99 && hungerBar.score < 1) {
    currentlyDragging = "none";
  }
}
function isNowCleaning() {
  if (healthBar.score < 76) {
    healthBar.score += 5 * (deltaTime / 1000);
    happinessBar.score += 3 * (deltaTime / 1000);
  }
  energyBar.score -= 1 * (deltaTime / 1000);

  localStorage.setItem("healthBar.score", healthBar.score);
  localStorage.setItem("happinessBar.score", happinessBar.score);
  localStorage.setItem("energyBar.score", energyBar.score);

  if (healthBar.score > 99 && happinessBar.score > 99 && energyBar.score < 1) {
    currentlyDragging = "none";
  }
}
function isNowShowering() {
  healthBar.score += 5 * (deltaTime / 1000);
  happinessBar.score += 3 * (deltaTime / 1000);
  energyBar.score -= 1 * (deltaTime / 1000)

  localStorage.setItem("healthBar.score", healthBar.score);
  localStorage.setItem("happinessBar.score", happinessBar.score);
  localStorage.setItem("energyBar.score", energyBar.score);

  if (healthBar.score > 99 && happinessBar.score > 99 && energyBar.score < 1) {
    currentlyDragging = "none";
  }

  
  //drawing water drops

  if (currentlyDragging == showerIcon.name) {
    showerIcon.waterdrop.time += deltaTime / 100; // Increment time
    if (showerIcon.waterdrop.time >= 1.7) {
      // Add a drop every 3 seconds
      showerIcon.waterdrop.x.push(random(mouseX - 40, mouseX - 20));
      showerIcon.waterdrop.y.push(mouseY - 10);
      showerIcon.waterdrop.time = 0; // Prevent multiple additions in the same frame
    }
  }

  // Update and display water drops
  for (let i = showerIcon.waterdrop.x.length - 1; i >= 0; i--) {
    showerIcon.waterdrop.y[i] += 100 * (deltaTime / 1000); // Move the drop down
    image(showerIcon.waterdrop.image, showerIcon.waterdrop.x[i], showerIcon.waterdrop.y[i]);

    // Remove drops that fall off the screen
    if (showerIcon.waterdrop.y[i] > 500) {
      showerIcon.waterdrop.x.splice(i, 1);
      showerIcon.waterdrop.y.splice(i, 1);
    }
  }
  

}

function colorOfBar(score) {
  if (score > 50) {
      fill("green");
    } else if (score >= 25 && score <= 50) {
      fill("orange");
    } else if (score < 25) {
      fill("red");
    } 
}

function scoreBarFillingEnergy() {
  if (energyBar.score < 0) {
    energyBar.height = 0;
    energyBar.score = 0;
    isDead = true;
  } else if (energyBar.score > 100) {
    energyBar.score = 100;
  }

  energyBar.score -= (deltaTime / 5000) * (100 / energyBar.size);
  energyBar.height = energyBar.score / (100 / energyBar.size);

  localStorage.setItem("energyBar.score", energyBar.score);
}
function scoreBarFillingHunger() {
  if (hungerBar.score < 0) {
    hungerBar.height = 0;
    hungerBar.score = 0;
    isDead = true;
  } else if (hungerBar.score > 100) {
    hungerBar.score = 100;
  }

  hungerBar.score -= (deltaTime / 5000) * (100 / hungerBar.size);
  hungerBar.height = hungerBar.score / (100 / hungerBar.size);

  localStorage.setItem("hungerBar.score", hungerBar.score)
}
function scoreBarFillingHappiness() {
  if (happinessBar.score < 0) {
    happinessBar.height = 0;
    happinessBar.score = 0;
    isDead = true;
  } else if (happinessBar.score > 100) {
    happinessBar.score = 100;
  }

  happinessBar.score -= (deltaTime / 4000) * (100/happinessBar.size);
  happinessBar.height = happinessBar.score / (100 / happinessBar.size);

  localStorage.setItem("happinessBar.score", happinessBar.score)
}
function scoreBarFillingHealth() {
  if (healthBar.score < 0) {
    healthBar.height = 0;
    healthBar.score = 0;
    isDead = true;
  } else if (healthBar.score > 100) {
    healthBar.score = 100;
  }

  if (sickness.isSick) {
    healthBar.score -= (deltaTime / 750) * (100 / healthBar.size);
  } else if (!sickness.isSick) {
    healthBar.score -= (deltaTime / 5000) * (100 / healthBar.size);
  }
  healthBar.height = healthBar.score / (100 / healthBar.size);

  localStorage.setItem("healthBar.score", healthBar.score);
}

function showPercentage() {
  textAlign(CENTER);

  //EnergyBar
  if (mouseX >= energyBar.x && mouseX <= (energyBar.x + energyBar.size) && mouseY >= energyBar.y && mouseY <= (energyBar.y + energyBar.size)) {
    textSize(15);
    strokeWeight(0);
    fill(0);
    text(`${round(energyBar.score)}%`, (energyBar.x + (energyBar.size / 2)), (energyBar.y + energyBar.size + 15));
  }
  
  //HungerBar
  if (mouseX >= hungerBar.x && mouseX <= (hungerBar.x + hungerBar.size) && mouseY >= hungerBar.y && mouseY <= (hungerBar.y + hungerBar.size)) {
    textSize(15);
    strokeWeight(0);
    fill(0);
    text(`${round(hungerBar.score)}%`, (hungerBar.x + (hungerBar.size / 2)), (hungerBar.y + hungerBar.size + 15));
  }
  
  //HappinessBar
  if (mouseX >= happinessBar.x && mouseX <= (happinessBar.x + happinessBar.size) && mouseY >= happinessBar.y && mouseY <= (happinessBar.y + happinessBar.size)) {
    textSize(15);
    strokeWeight(0);
    fill(0);
    text(`${round(happinessBar.score)}%`, (happinessBar.x + (happinessBar.size / 2)), (happinessBar.y + happinessBar.size + 15));
  }
  
  //HealthBar
  if (mouseX >= healthBar.x && mouseX <= (healthBar.x + healthBar.size) && mouseY >= healthBar.y && mouseY <= (healthBar.y + healthBar.size)) {
    textSize(15);
    strokeWeight(0);
    fill(0);
    text(`${round(healthBar.score)}%`, (healthBar.x + (healthBar.size / 2)), (healthBar.y + healthBar.size + 15));
  }
  
  //SicknessBar
  if (mouseX >= sickness.barX && mouseX <= (sickness.barX + sickness.barSize) && mouseY >= sickness.barY && mouseY <= (sickness.barY + sickness.barSize) && sickness.isSick) {
    textSize(15);
    strokeWeight(0);
    fill(0);
    text(`${round(sickness.barScore)}%`, (sickness.barX + (sickness.barSize / 2)), (sickness.barY + sickness.barSize + 15));
  }
  
  textAlign(LEFT);
}

//Icons
function drawIcons() {
  //Food
  if (room.current == 3) {
    if (currentlyDragging == foodIcon.name) {
      image(foodIcon.image, foodIcon.x - 2.5, foodIcon.y - 2.5, foodIcon.size + 5, foodIcon.size + 5);
    } else {
      image(foodIcon.image, foodIcon.x, foodIcon.y);
    }
  
    if (foodIcon.rollingMenu) {
      stroke(93, 51, 48);
      strokeWeight(2)
      line(foodIcon.x - 30, foodIcon.y - 15, foodIcon.x + 75, foodIcon.y - 15)
  
      strokeWeight(4)
      stroke(93, 51, 48)
      line(foodIcon.x - 25, foodIcon.y + 13, foodIcon.x - 5, foodIcon.y + 13)
    } else if (!foodIcon.rollingMenu) {
      strokeWeight(4)
      stroke(93, 51, 48)
      line(foodIcon.x - 25, foodIcon.y + 13, foodIcon.x - 5, foodIcon.y + 13)
      line(foodIcon.x - 15, foodIcon.y + 3, foodIcon.x - 15, foodIcon.y + 23)
    }
  }



  //Food Fly
  if (foodIcon.rollingMenu && currentlyDragging == foodIcon.flyName && foodIcon.flyAmount > 0 && room.current == 3) {
    image(foodIcon.flyImage, foodIcon.flyX, foodIcon.flyY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.flyAmount, foodIcon.flyX - 20, foodIcon.flyY + 60);
    
    image(foodIcon.flyImage, mouseX - (foodIcon.flySize/2), mouseY - (foodIcon.flySize/2));
  } else if (foodIcon.rollingMenu && room.current == 3) {
    image(foodIcon.flyImage, foodIcon.flyX, foodIcon.flyY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.flyAmount, foodIcon.flyX - 20, foodIcon.flyY + 60);
  }

  //Food Worms
  if (foodIcon.rollingMenu && currentlyDragging == foodIcon.wormsName && foodIcon.wormsAmount > 0 && room.current == 3) {
    image(foodIcon.wormsImage, foodIcon.wormsX, foodIcon.wormsY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.wormsAmount, foodIcon.wormsX - 35, foodIcon.wormsY + 60);

    image(foodIcon.wormsImage, mouseX - (foodIcon.wormsSize/2), mouseY - (foodIcon.wormsSize/2));
  } else if (foodIcon.rollingMenu && room.current == 3) {
    image(foodIcon.wormsImage, foodIcon.wormsX, foodIcon.wormsY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.wormsAmount, foodIcon.wormsX - 35, foodIcon.wormsY + 60);
  }

  //Food Medicine
  if (foodIcon.rollingMenu && currentlyDragging == foodIcon.medicineName && foodIcon.medicineAmount > 0 && room.current == 3) {
    image(foodIcon.medicineImage, foodIcon.medicineX, foodIcon.medicineY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.medicineAmount, foodIcon.medicineX - 35, foodIcon.medicineY + 50);

    image(foodIcon.medicineImage, mouseX - (foodIcon.medicineSize/2), mouseY - (foodIcon.medicineSize/2));
  } else if (foodIcon.rollingMenu && room.current == 3) {
    image(foodIcon.medicineImage, foodIcon.medicineX, foodIcon.medicineY);

    fill(93, 51, 48);
    stroke(93, 51, 48);
    strokeWeight(2);
    textSize(40);
    text(foodIcon.medicineAmount, foodIcon.medicineX - 35, foodIcon.medicineY + 50);
  }

  //Sleep
  if (currentlyDragging == sleepIcon.name && room.current == 2) {
    image(sleepIcon.image, mouseX - (sleepIcon.size/2), mouseY - (sleepIcon.size/2), sleepIcon.size + 5, sleepIcon.size + 5);
  } else if (room.current == 2) {
    image(sleepIcon.image, sleepIcon.x, sleepIcon.y);
  }

  //Play
  if (currentlyDragging == playIcon.name && room.current == 4) {
    image(playIcon.image, playIcon.x - 2.5, playIcon.y - 2.5, playIcon.size + 5, playIcon.size + 5);
  } else if (room.current == 4) {
    image(playIcon.image, playIcon.x, playIcon.y);
  }

  //Clean
  if (currentlyDragging == cleanIcon.name && room.current == 1) {
    image(cleanIcon.image, mouseX - (cleanIcon.size/2), mouseY - (cleanIcon.size/2), cleanIcon.size + 5, cleanIcon.size + 5);
  } else if (room.current == 1) {
    image(cleanIcon.image, cleanIcon.x, cleanIcon.y);
  }

  if (currentlyDragging == showerIcon.name && room.current == 1) {
    image(showerIcon.image, mouseX - (showerIcon.size/2), mouseY - (showerIcon.size/2), showerIcon.size + 5, showerIcon.size + 5);
  } else if (room.current == 1) {
    image(showerIcon.image, showerIcon.x, showerIcon.y);
  }
} 

function mousePressed() {
  //Food Icon
  if (mouseX > foodIcon.x && mouseX < foodIcon.x + foodIcon.size && 
      mouseY > foodIcon.y && mouseY < foodIcon.y + foodIcon.size && room.current == 3) {
    currentlyDragging = foodIcon.name;

    if (foodIcon.rollingMenu == true) {
      foodIcon.rollingMenu = false;
    } else if (foodIcon.rollingMenu == false) {
      foodIcon.rollingMenu = true;
    }
  }

  //Food Icon Fly
  if (mouseX > foodIcon.flyX && mouseX < foodIcon.flyX + foodIcon.flySize && 
      mouseY > foodIcon.flyY && mouseY < foodIcon.flyY + foodIcon.flySize && room.current == 3) {
    currentlyDragging = foodIcon.flyName;
  }

  //Food Icon Worms
  if (mouseX > foodIcon.wormsX && mouseX < foodIcon.wormsX + foodIcon.wormsSize && 
      mouseY > foodIcon.wormsY && mouseY < foodIcon.wormsY + foodIcon.wormsSize && room.current == 3) {
    currentlyDragging = foodIcon.wormsName;
  }

  //Food Icon Medicine
  if (mouseX > foodIcon.medicineX && mouseX < foodIcon.medicineX + foodIcon.medicineSize && 
      mouseY > foodIcon.medicineY && mouseY < foodIcon.medicineY + foodIcon.medicineSize && room.current == 3) {
    currentlyDragging = foodIcon.medicineName;
  }

  //Sleep Icon
  if (mouseX > sleepIcon.x && mouseX < sleepIcon.x + sleepIcon.size && 
      mouseY > sleepIcon.y && mouseY < sleepIcon.y + sleepIcon.size && room.current == 2) {
    currentlyDragging = sleepIcon.name;
  }

  //Play Icon
  if (mouseX > playIcon.x && mouseX < playIcon.x + playIcon.size && 
      mouseY > playIcon.y && mouseY < playIcon.y + playIcon.size && room.current == 4) {
      currentlyDragging = playIcon.name;
      
    if(playingIsSet == false) {
      setTimeout(isNowPlaying, 100);
      playingIsSet = true;
    }
  }
  
  //Clean Icon
  if (mouseX > cleanIcon.x && mouseX < cleanIcon.x + cleanIcon.size && 
      mouseY > cleanIcon.y && mouseY < cleanIcon.y + cleanIcon.size && room.current == 1) {
    currentlyDragging = cleanIcon.name;
  }

  //Shower Icon
  if (mouseX > showerIcon.x && mouseX < showerIcon.x + showerIcon.size &&
      mouseY > showerIcon.y && mouseY < showerIcon.y + showerIcon.size && 
      room.current == 1 && bubbles) {
    currentlyDragging = showerIcon.name;
  }



} 
function mouseReleased() {
  currentlyDragging = "none"

  showerIcon.waterdrop.x = [];
  showerIcon.waterdrop.y = [];
}


function draw() {    
  //background(135, 206, 265);
  drawRoom();
  console.log(`${round(sickness.timerUntilSickness)}`);
  if (!isDead) {
    tamagotchi.nameButton.show();
    reloadButton.show();
    store.button.hide();
    store.openButton.hide();

    drawStore();
    drawName();
    drawCoins();
    drawDeaths();
    drawFrog();
    drawBars();
    drawIcons();  
    drawSickness();
  } else if (isDead) {
    isNowDead();
  }
}

//To Do List:
  //Store button bigger
  //Bubbles disappearen
  //Game with soccer
  //Backgrounds change
  //Dark/light mode with button
  //backgrounds on the bars







  //Facial expressions working
    //sickLook moet ook nog
    //slaap met z'tjes
    //Dirty Look mooi maken
    //Bubbles whenever he is getting washed
  //Add store
    //Sneak peak store
  //medicine working

    //Soms de eerste keer gelijk dood als je medicine geeft zonder ziek te zijn.
    //Als de sickness timer om is (en hij dus ziek wordt), word ie niet meer beter
    //hij wordt niet meer beter
  //Allow to see percentages bars when clicked on------------------------------------

//Extra List:
  //Verschillende soorten eten - 
  //Minigame toevoegen - 3pt
//Zelf naam geven - 1pt
//Willekeurige gebeurtenissen (ziekte elke 10* minuten) - 2pt
//Inventory system (inventory voedsel/medicijnen) - 3pt