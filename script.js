//Definition des questions
const questions = [
    
    {
        question: "Javascript is the same as Java ?",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "which events occurs when we clich on a HTML elements?",
        options: ["onclick", "onmouseover", "ondbclick", "onchange"],
        answer: "onclick"
    },
    {
        question: "The external JavaScript file must contain the script tag.?",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["v carName", "var carName", "variable carName"],
        answer: "var carName"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function-myFunction()", "function:myFunction"],
        answer: "function myFunction()"
    },

    {
        question: "How do you call a function named 'myFunction'?",
        options: ["myFunction();", "call myFunction()", "myFunction"],
        answer: "myFunction();"
    },

    {
        question: "What will the following code return: Boolean(10 > 9)?",
        options: ["True", "False", "Nan"],
        answer: "True"
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        options: ["Math.Round(7.25)", "rnd(7.25)", "Round(7.25)", "Math.Rnd(7.25)"],
        answer: "Math.Round(7.25)"
    },

];

contener = document.getElementById("question");
result = document.getElementById("result");
submitButton = document.getElementById("submit");
score = document.getElementById("score");
submitButton.addEventListener('click', ()=>checkAnswers());
userAnswers=[];

function afficher_question(){
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
    const currentQuizQuestion = questions[questionIndex];
    questionBlock = document.createElement('div');
    //questionBlock.style.fontWeight="bold";
    questionBlock.style.fontSize="20px";
    questionBlock.classList.add("my-3");
    questionElement = document.createElement('div');
    questionElement.textContent = questionIndex+1+"-"+ currentQuizQuestion.question;
    optionsContener = document.createElement('div');

    currentQuizQuestion.options.forEach((option,index) => {
        
            const optionElement = document.createElement('input');
            optionElement.type="radio";
            optionElement.value=index;
            optionElement.id = questionIndex;
            optionElement.name = questionIndex;
            optionElement.classList.add("mx-2","my-3");

            optionLabel = document.createElement('label');
            optionLabel.for = questionIndex;
            optionLabel.textContent=option;
            
            optionElement.addEventListener('click', ()=> registerAnswer(option, questionIndex));

            optionsContener.appendChild(optionElement);
            optionsContener.appendChild(optionLabel);
        })
    responseLabel = document.createElement('span');
    responseLabel.id = "responseLabel"+questionIndex;
    responseLabel.textContent='';

    questionBlock.appendChild(questionElement);
    questionBlock.appendChild(optionsContener);
    questionBlock.appendChild(responseLabel);

    contener.appendChild(questionBlock);
    }
} ;

function registerAnswer(userAnswer, questionIndex){
    json_answer={
        'questionIndex': questionIndex, 
        'userAnswer': userAnswer,
    }

    index = userAnswers.findIndex(q => q.questionIndex === questionIndex);
    if (index!==-1) {
        userAnswers.splice(index, 1, json_answer);
        
    } else {
        userAnswers.push(json_answer);
        
    }

    //console.log(userAnswers);
}

function checkAnswers(){
    point = 0;
    userAnswers.forEach((answerObject, index)=>{
        if (answerObject.userAnswer == questions[answerObject.questionIndex].answer) {
            
            responseLabel = document.getElementById("responseLabel"+index);
            responseLabel.className="";
            responseLabel.classList.add("text-success");
            responseLabel.textContent="!Bonne réponse";
            point++;
        } else {
            
            responseLabel = document.getElementById("responseLabel"+index);
            responseLabel.className="";
            responseLabel.classList.add("text-danger", "my-1");
            responseLabel.textContent="!Mauvaise réponse";
            
        }
        score.classList.add("text-primary");
        score.textContent = "Votre Score est de : "+point+ " /"+questions.length;
        stopTimer();
    })
}
afficher_question();

// Sélectionnez l'élément du minuteur
const timerDisplay = document.getElementById('timer');

let seconds = 0;
let minutes = 0;
let timer;

// Fonction pour démarrer le minuteur
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Fonction pour arrêter le minuteur
function stopTimer() {
    clearInterval(timer);
}

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    const displayMinutes = (minutes < 10) ? '0' + minutes : minutes;
    const displaySeconds = (seconds < 10) ? '0' + seconds : seconds;
    timerDisplay.textContent = displayMinutes + ':' + displaySeconds;
}

// Démarrer le minuteur
startTimer();

// Pour arrêter le minuteur, utilisez stopTimer()
// stopTimer();
