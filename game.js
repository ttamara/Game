const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 600;
context.canvas.width = 500;

let lives = 3;
let numOfBones = 0;
let newBones = 0;
let level = 1;

let acceleration = 0.84;

let start = false;

const player = {
    x: 225,
    xVelocity: 0,
    y: 600 - 40,
    yVelocity: 0
};

let playerImage = new Image();
playerImage.src = "player.png";

const bone = {
    x: 230,
    y: 200
};

let boneImage = new Image();
boneImage.src = "bone.png";

const firstObsticle = {
    x: -90,
    y: -50
};

let firstObsticleImage = new Image();
firstObsticleImage.src = "mud.png";

const secondObsticle = {
    x: -90,
    y: -50
};

let secondObsticleImage = new Image();
secondObsticleImage.src = "mud.png";

const thirdObsticle = {
    x: -90,
    y: -50
};

let thirdObsticleImage = new Image();
thirdObsticleImage.src = "mud.png";

let boneSound = new Audio('boneSound.wav');
let puddleSound = new Audio('puddleSound.wav');

const nextFrame = function(){

    firstObsticle.x = Math.floor(Math.random()*410);
    firstObsticle.y = Math.floor(Math.random()*80);
    secondObsticle.x = Math.floor(Math.random()*410);
    secondObsticle.y = Math.floor(Math.random()*80+130);
    thirdObsticle.x = Math.floor(Math.random()*410);
    thirdObsticle.y = Math.floor(Math.random()*90+260);

    while(1) {

        bone.x = Math.floor(Math.random()*460);
        bone.y = Math.floor(Math.random()*400);

        if(bone.x > firstObsticle.x-40 && bone.x < firstObsticle.x+90+40 
            && bone.y > firstObsticle.y-40 && bone.y < firstObsticle.y+50+40){
                continue;
            } 
        else if(bone.x > secondObsticle.x-40 && bone.x < secondObsticle.x+90+40
            && bone.y > secondObsticle.y-40 && bone.y < secondObsticle.y+50+40){
                continue;
            }
        else if(bone.x > thirdObsticle.x-40 && bone.x < thirdObsticle.x+90+40
            && bone.y > thirdObsticle.y-40 && bone.y < thirdObsticle.y+50+40){
                continue;
            }
        else {
                break;
            }
    }

}

const controller = {
    left: false,
    right: false,
    keyListener: function(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 37: // left arrow
              controller.left = key_state;
              break;
            case 39: // right arrow
              controller.right = key_state;
              break;
            case 32: //space button
                start = true;
                break;
          }
    }
}

const loop = function() {

    if(start == true){

        player.yVelocity -= 0.5;

        if(controller.left){
            player.xVelocity -= 0.5;
        }
        if(controller.right){
            player.xVelocity += 0.5;
        }

        player.x += player.xVelocity;
        player.y += player.yVelocity;

        player.xVelocity *= acceleration; //friction
        player.yVelocity *= acceleration; //friction

        if(player.x < 0){
            player.x = 0;
        }
        else if(player.x > 460){
            player.x = 460;
        }

        if(player.y < 0){
            player.y = 600-40;
            nextFrame();
        }

        if(player.x <= (bone.x+40) && player.x >= (bone.x-40) && player.y <= (bone.y+40) && player.y >= (bone.y-40)){

            boneSound.play();

            numOfBones++;
            newBones++;
            if(newBones > level){
                level++;
                newBones = 0;
                acceleration += 0.005;
            }
            bone.x = -40;
            bone.y = -40;
        }

        if(player.x <= (firstObsticle.x+90) && player.x >= (firstObsticle.x-40) && player.y <= (firstObsticle.y+50) && player.y >= (firstObsticle.y-40)){
        
            puddleSound.play();
        
            lives--;
            firstObsticle.x = -90;
            firstObsticle.y = -50;
        }

        if(player.x <= (secondObsticle.x+90) && player.x >= (secondObsticle.x-40) && player.y <= (secondObsticle.y+50) && player.y >= (secondObsticle.y-40)){
        
            puddleSound.play();
        
            lives--;
            secondObsticle.x = -90;
            secondObsticle.y = -50;
        }

        if(player.x <= (thirdObsticle.x+90) && player.x >= (thirdObsticle.x-40) && player.y <= (thirdObsticle.y+50) && player.y >= (thirdObsticle.y-40)){
        
            puddleSound.play();
        
            lives--;
            thirdObsticle.x = -90;
            thirdObsticle.y = -50;
        }

        context.fillStyle = "#63c900";
        context.fillRect(0,0,500,600);
    
        context.drawImage(playerImage, player.x, player.y);
    
        context.drawImage(boneImage, bone.x, bone.y);
    
        context.drawImage(firstObsticleImage, firstObsticle.x, firstObsticle.y);
        context.drawImage(secondObsticleImage, secondObsticle.x, secondObsticle.y);
        context.drawImage(thirdObsticleImage, thirdObsticle.x, thirdObsticle.y);
    
    
        context.fillStyle = "white";
        context.font = "20px Helvetica";
        context.textAlign = "right";
        context.fillText("Lives left: " + lives, 490, 20);
        context.fillText("Bones collected: " + numOfBones, 490, 40);
        context.fillText("Level: " + level, 490, 60);
    
        if(lives == 0){
            context.fillStyle = "red";
            context.font = "50px Helvetica";
            context.textAlign = "center";
            context.fillText("GAME OVER!!!", 250, 300);
        } else {
            window.requestAnimationFrame(loop);
        }

    } else{

        context.fillStyle = "#63c900";
        context.fillRect(0,0,500,600);

        context.drawImage(playerImage, player.x, player.y);
    
        context.drawImage(boneImage, bone.x, bone.y);

        context.fillStyle = "white";
        context.font = "20px Helvetica";
        context.textAlign = "right";
        context.fillText("Lives left: 0", 490, 20);
        context.fillText("Bones collected: 0", 490, 40);
        context.fillText("Level: 0", 490, 60);

        context.fillStyle = "white";
        context.font = "40px Helvetica";
        context.textAlign = "center";
        context.fillText("Press space to start!", 250, 300);

        window.requestAnimationFrame(loop);

    }

}


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);