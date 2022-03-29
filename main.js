Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'; 
    });
}

console.log('ml5 version:' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RjRFDLZlc/model.json' , modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "That was Amazing!";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "It was an incredible Victory!";
        }
        if(results[0].label == "Yes"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "Yes! You did it";
        }
        if(results[0].label == "No"){
            document.getElementById("update_gesture").innerHTML = "&#128078;";
            document.getElementById("quote").innerHTML = "No! You failed";
        }
        if(results[0].label == "Hello"){
            document.getElementById("update_gesture").innerHTML = "&#128400;";
            document.getElementById("quote").innerHTML = "Hello!";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}
