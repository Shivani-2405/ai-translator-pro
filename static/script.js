async function translateText() {

    const text =
        document.getElementById("inputText").value;

    const source =
        document.getElementById("sourceLang").value;

    const target =
        document.getElementById("targetLang").value;

    if(text.trim() === "") {

        alert("Please enter text");

        return;
    }

    try {

        const response =
        await fetch("/translate", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                text:text,
                source:source,
                target:target

            })
        });

        const data =
        await response.json();

        document
        .getElementById("outputText")
        .value = data.translatedText;

        addToHistory(
            text,
            data.translatedText
        );

    } catch(error) {

        console.log(error);

        alert("Translation Failed");
    }
}

/* COPY */

function copyText() {

    const text =
    document.getElementById("outputText").value;

    navigator.clipboard.writeText(text);

    alert("Copied!");
}

/* SPEAK INPUT */

function startVoiceInput() {

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert("Voice not supported");

        return;
    }

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult =
    function(event){

        document
        .getElementById("inputText")
        .value =
        event.results[0][0].transcript;
    };
}

/* LISTEN */

document
.getElementById("listenBtn")
.addEventListener("click", ()=>{

    const text =
    document
    .getElementById("outputText")
    .value;

    if(text.trim()===""){

        alert("No translated text");

        return;
    }

    window.speechSynthesis.cancel();

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    setTimeout(()=>{

        window
        .speechSynthesis
        .speak(speech);

    },200);
});

/* HISTORY */

function addToHistory(
    original,
    translated
){

    const history =
    document
    .getElementById("historyList");

    const li =
    document.createElement("li");

    li.innerHTML = `
        <strong>Original:</strong>
        ${original}
        <br>
        <strong>Translated:</strong>
        ${translated}
    `;

    history.prepend(li);
}