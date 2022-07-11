prediction_1 = "";
prediction_2 = "";
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

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_Xbu0azWh/model.json',modelLoaded);

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
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "amazing") {
            document.getElementById('result_emoji').innerHTML = "&#128076;";
        }
        if (results[0].label == "best") {
            document.getElementById('result_emoji').innerHTML = "&#128077;";
        }
        if (results[0].label == "victory") {
            document.getElementById('result_emoji').innerHTML = "&#9996;";
        }
        if (results[1].label == "amazing") {
            document.getElementById('result_emoji2').innerHTML = "&#128076;";
        }
        if (results[1].label == "best") {
            document.getElementById('result_emoji2').innerHTML = "&#128077;";
        }
        if (results[1].label == "victory") {
            document.getElementById('result_emoji2').innerHTML = "&#9996;";
        }
    }
}