//https://teachablemachine.withgoogle.com/models/9cFmexwel/

Webcam.set({
   width:400,
   height:350,
   image_format:"png",
   png_quality:90
}) ;

Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>' ;

    })
}
speak_data1 = ""

console.log("ml5 version- ",ml5.version) ;

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9cFmexwel/model.json",modelReady) ;

function modelReady() {
    console.log("model loaded!")
}


function speak() {
    var synth = window.speechSynthesis ;
    speak_data1 = "The first prediction is " + prediction1 ;
    var utterThis = new SpeechSynthesisUtterance(speak_data1)
    synth.speak(utterThis) 
}


function check() {
    img=document.getElementById("captured_image") ;
    classifier.classify(img,getResults) ;

}

function getResults(error,results) {
    if(error){
        console.log(error)
    } 
    else {
        console.log(results)
        prediction1 = results[0].label ;
       

        document.getElementById("result_gesture_name").innerHTML = prediction1 ;
        

        speak()

        if(prediction1=="Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;" ;
        }

        if(prediction1=="Peace"){
            document.getElementById("update_emoji").innerHTML = "&#9996;" ;
        }

        if(prediction1=="Thumbs Down"){
            document.getElementById("update_emoji").innerHTML = "&#128078;" ;
        }



        
    }


}

