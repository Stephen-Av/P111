Webcam.set({
    width: 300,
    height: 350,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5 version "+ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uBoA5TnJC/model.json',modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}
function speak() {
    synth = window.speechSynthesis;
    speak_data = toSpeak
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = "";
        if (gesture == "amazing") {
            toSpeak = "This is looking Amazing";
            document.getElementById('result_emoji').innerHTML = "&#128076;";
        }
        else if (gesture == "best") {
            toSpeak = "All the Best"
            document.getElementById('result_emoji').innerHTML = "&#128077;";
        }
        else if (gesture == "victory") {
            toSpeak = "That was a marvelleuos Victory"
            document.getElementById('result_emoji').innerHTML = "&#9996;";
        }
        speak();

     }
}