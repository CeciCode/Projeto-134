status= "";
objects= [];
function preload() {
    
}
function setup() {
    canvas= createCanvas(480, 380);
    canvas.center();
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detectando Objetos";
    video= createCapture(VIDEO);
    video.hide();
}
function modelLoaded() {
    console.log("COCOMELON");
    status= true;
    objectDetector.detect(gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects= results;
}
function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: Objeto Decetidado";
            fill("#a742f5");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#a742f5");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    if(objects[0].label == "person") {
        document.getElementById("status").innerHTML= "Ser capivarístico encontrado";
        fill("purple");
        text(objects[0].label, objects[0].x + 15, objects[0].y + 15);
        noFill();
        stroke("purple");
        rect(objects[0].x, objects[0].y, objects[0].width, objects[0].height)
    }
    else {
        document.getElementById("status").innerHTML= "A capivara não foi encontrada, se desespere";
    }
}