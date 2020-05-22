//variables
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choiceButtonEl = document.getElementById("choice");
var startButton = document.getElementById("start");
var nextButton = document.getElementById("next");
var resultEl = document.getElementById("result");
var timerEl = document.getElementById("timer")
var scoreEl = document.getElementById("score")
var viewScoreEl = document.getElementById("viewscore")
var headerEl = document.getElementById("header")
var subHeaderEl = document.getElementById("subheader")
var ended = false;
var currentQuestion = 0;
var nextQuestion = 0;
var time = 0;
var score = 0;

//event listeners
scoreEl.addEventListener("click", viewScore);
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    nextQuestion++;
    if (nextQuestion > quizQuestions.length - 1){
        updateScore();
        endQuiz();
        return;
    }
    setNextQuestion();
    updateScore();
})


//start quiz function
function startQuiz(){
    time = 90;
    score = 0;
    nextQuestion = 0;

    //delay the the timer element
    setTimeout(() => {
        timerEl.classList.remove("hide")}, 1000);

    //hide and add these elements
    startButton.classList.add("hide");  
    headerEl.classList.add("hide"); 
    subHeaderEl.classList.add("hide"); 
    questionContainer.classList.remove("hide");
    
    //stop timer if it equals timer is 0 or less than 0 or quiz has ended
    clearInterval(timeInterval);
    var timeInterval = setInterval(() => {
        if (time === 0 || time < 0 || ended === true){
            clearInterval(timeInterval);
        } else {
            createTimer();
        }}, 1000);

    ended = false;

    setNextQuestion();
};

//set next question function
function setNextQuestion() {
    
    //add the question element back to the page
    questionEl.classList.remove("hide");

    resetQuestion();
    showQuestion(quizQuestions[nextQuestion]);
}

//show question function
function showQuestion(quizQuestions){

    currentQuestion = quizQuestions;

    questionEl.innerText = currentQuestion.question;

    currentQuestion.choices.forEach(choices => {
        var button = document.createElement('button');
        button.innerText = choices.text;
        button.classList.add('btn');
        if (choices.correct) {
            button.dataset.correct = choices.correct;
        }
        choiceButtonEl.appendChild(button);
        button.addEventListener("click", selectAnswer);
    })
};

//reset question function
function resetQuestion() {
    nextButton.classList.add("hide");
    while (choiceButtonEl.firstChild){
        choiceButtonEl.removeChild(choiceButtonEl.firstChild)
    };
    while (resultEl.firstChild){
        resultEl.removeChild(resultEl.firstChild)
    };
    while (viewScoreEl.firstChild){
        viewScoreEl.removeChild(viewScoreEl.firstChild)
    };
}

//select answer function
function selectAnswer(event) {
    var selectedAnswer = event.target;
    var correct = selectedAnswer.dataset.correct;

    setStatus(document.body, correct);

    Array.from(choiceButtonEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })

    if (correct){
        var result = document.createElement("div");
        result.innerText = "Correct, great job!";
        resultEl.appendChild(result);
        score = score + 24;
    } else {
        var result = document.createElement("div");
        result.innerText = "Sorry, wrong asnwer.";
        resultEl.appendChild(result);
        time = time - 10 ;
        score = score - 12;
    }
    nextButton.classList.remove("hide");
}

//set status class
function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add("correct");
    };
};

//clear status
function clearStatus(element){
    element.classList.remove("correct");
};

//end quiz
function endQuiz () {
    var username = prompt("Enter your name to log your score!");
    while (username === null){
        alert("Input a name!");
        username = prompt("Enter your name to log your score!");
    }
    
    var quizData = username + " " + score; 
    var scoreValue = localStorage.getItem("score");
    localStorage.setItem("score", scoreValue + "`" + quizData);

    ended = true;
    timerEl.classList.add("hide");
    questionEl.classList.add("hide");
    startButton.innerText = "Restart";
    resetQuestion();
    startButton.classList.remove('hide');
    
    headerEl.classList.remove('hide');
    headerEl.innerText = "Great Work!";
};

//update score
function updateScore (){
    scoreEl.innerText = "Your Current Score: " + score;
};

//view high score
function viewScore () {
    while (viewScoreEl.firstChild){
        viewScoreEl.removeChild(viewScoreEl.firstChild)
    };

    var scoreValue = localStorage.getItem("score");
    var scoreSplit = scoreValue.split("`");
    scoreSplit.shift();
    for (var i = scoreSplit.length - 3; i < scoreSplit.length; i++){
        if (i < 0){
            i = 0;
        }
        var scoreDisplay = document.createElement("li");
        var scoreText = document.createTextNode(scoreSplit[i]);

        scoreDisplay.appendChild(scoreText);
        viewScoreEl.appendChild(scoreDisplay);
    }
};

//create timer
function createTimer() {
    timerEl.textContent = time + " sec";
    time--;
    if (time === 0 || time < 0) {
        alert("Time is up!");
        endQuiz();
        return;
    }
}

//question array
var quizQuestions = [
    { question: 'Using _______ statement is how you test for a specific condition?',
        choices: [
        {
            text: 'Select',
            correct: false
        },
        {
            text: 'If',
            correct: true
        },
        {   
            text: 'Switch',
            correct: false
        },
        {   
            text: 'For',
            correct: false
        }]
    },
    { question: "How do you create a function in JavaScript?",
        choices: [
        {
            text: 'function:myFunction()',
            correct: false
        },
        {
            text: 'function myFunction()',
            correct: true
        },
        {   
            text: 'function = myFunction()',
            correct: false
        },
        {   
            text: 'function',
            correct: false
        }]
    },
    { question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5",
        choices: [
        {
            text: 'if i <> 5',
            correct: false
        },
        {
            text: 'if i=! 5 then',
            correct: false
        },
        {   
            text: 'if (i<> 5)',
            correct: true
        },
        {   
            text: 'if (i != 5)',
            correct: false
        }]
    },
    { question: "Which event occurs when the user clicks on an HTML element?",
        choices: [
        {
            text: 'onchange',
            correct: false
        },
        {
            text: 'onclick',
            correct: true
        },
        {   
            text: 'onmouseclick',
            correct: false
        },
        {   
            text: 'onmouseover',
            correct: false
        }]
    },
    { question: "How is a function called in JavaScript?",
        choices: [
        {
            text: 'Geekfunc();',
            correct: true
        },
        {
            text: 'call function GeekFunc();',
            correct: false
        },
        {   
            text: 'call Geekfunc();',
            correct: false
        },
        {   
            text: 'function Geekfunc()"',
            correct: false
        }]
    }  
];
