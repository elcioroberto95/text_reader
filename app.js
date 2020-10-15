/*SELECTING THE NECESSARY HTML ELEMENTS*/
const main = document.querySelector("main");
const buttonInsertText = document.querySelector(".btn-toggle");
const divTextBox = document.querySelector(".text-box");
const divCLose = document.querySelector(".close");
const selectedElement = document.querySelector("select");
const readText = document.getElementById('read');
const textArea = document.querySelector('textarea');

/* OBJETCT WITH PHOTOPS AND DESCRIPTIONS */
const humanExpression = [
  { img: "./img/drink.jpg", text: "Estou com sede" },
  { img: "./img/food.jpg", text: "Estou com fome" },
  { img: "./img/tired.jpg", text: "Estou com cansado" },
  { img: "./img/hurt.jpg", text: "Estou machucado" },
  { img: "./img/happy.jpg", text: "Estou feliz" },
  { img: "./img/angry.jpg", text: "Estou com raiva" },
  { img: "./img/sad.jpg", text: "Estou triste" },
  { img: "./img/scared.jpg", text: "Estou assustado" },
  { img: "./img/outside.jpg", text: "Quero ir lá fora" },
  { img: "./img/home.jpg", text: "Quero ir para casa" },
  { img: "./img/school.jpg", text: "Quero ir para a escola" },
  { img: "./img/grandma.jpg", text: "Quero ver a vóvó" },
];
/*CREATE INSTANCE OF BLA BLA */
const utterace = new SpeechSynthesisUtterance();
/**ATRIBUI O TEXTO AO ATRIBUTO DE TEXTO DA INSTANCIA  DO OBJETO QUE PRODUZ A VOZ */
const setTextMessage = text => {
    utterace.text = text;
}
const speakText = () => {
    speechSynthesis.speak(utterace);
}
const setVoice = (event) => {
  const selectedVoice = voices.find(voice => voice.name === event.target.value)
  utterace.voice = selectedVoice;
}

/*FUNCTION THAT RENDERIZES THE LAYOUT WITH PHOTOS AND DESCRIPTIONS */
const addExpressionBoxesIntoDom = () => {
  main.innerHTML = humanExpression.map(({ img, text })=>
    `<div class="expression-box">
    <img src="${img}" data-js="${text}" alt="${text}">
    <p class="info"  data-js="${text}" >${text} </p>
    </div>
    `
  ).join('')
 
    }

const setStyleOfClickedElement = dataValue => {
  const div = document.querySelector(`[data-js="${dataValue}"]`);
div.classList.add('active');
setTimeout(() => {
  div.classList.remove('active');
},1000)
}
addExpressionBoxesIntoDom()

main.addEventListener('click', (event) => {
const clickedElement = event.target;
const clickedElementText = clickedElement.dataset.js;
const clickedElementTextMustBeSpoken = ['IMG','P'].some(elementName =>
  clickedElement.tagName.toLowerCase() === elementName.toLowerCase())

if(clickedElementTextMustBeSpoken){
setTextMessage(clickedElementText)
speakText();
setStyleOfClickedElement(clickedElementText);
}
})


/*const CreateExpressionBox = ({ img, text }) => {
  const div = document.createElement("div");
  div.classList.add("expression-box");
  div.innerHTML = `<img src="${img}" alt="${text}">
    <p class="info">${text}</p>`;

  div.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    div.classList.add('active');
    setTimeout(() => {
        div.classList.remove('active');
    },1000)
  });

  main.appendChild(div);
};
humanExpression.forEach(CreateExpressionBox);
*/
const insertOptionElementIntoDOM = voices =>{
  selectedElement.innerHTML =  voices.reduce((accumulator,{ name, lang}) => {
    accumulator += `<option value="${name}">${lang} | ${name}</option>`
    return accumulator
  },'');
 

}
const setUtteranceVoice = voice => {
  utterace.voice = voice;
  const VoiceOptionElement = selectedElement.querySelector(`[value="${voice.name}"]`)
  VoiceOptionElement.selected = true;
}
const setPTBRVoices = voices => {
  
 const googleVoice = voices.find(voice =>
  voice.name =='Google português do Brasil');
 const microsoftVoice =voices.find(voice =>
 voice.name =='Microsoft Maria Desktop - Portuguese(Brazil)');
 
 if (googleVoice){
  setUtteranceVoice(googleVoice)
 

 } else if (microsoftVoice) {
  setUtteranceVoice(microsoftVoice)
  
 }

}
let voices = [];

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();

  insertOptionElementIntoDOM(voices);
  setPTBRVoices(voices);


});

/*EVENT ADDED TO SHOW MODAL BY CLICKING*/
buttonInsertText.addEventListener("click", () => {
  console.log("foi");
  divTextBox.classList.add("show");
});
/*EVENT ADDED TO CLOSE MODAL */
divCLose.addEventListener("click", () => {
  divTextBox.classList.remove("show");
});
selectedElement.addEventListener('change',setVoice);

readText.addEventListener('click',() => {
  setTextMessage(textArea.value);
  speakText();
})
