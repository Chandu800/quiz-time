const questions = [
    {
        question:"Which stage of labor involves the complete dilation of the cervix?",
        answers: [
            { text: "First Stage", correct: false},
            { text: "Second Stage", correct: true},
            { text: "Third Stage", correct: false},
            { text: "Fourth Stage", correct: false},
        ]
    },
    {
        question:"What is the average duration of the first stage of labor in a primigravida?",
        answers: [
            { text: "6–8 hours", correct: false},
            { text: "8–12 hours", correct: true},
            { text: "12–20 hours", correct: false},
            { text: "20–24 hours", correct: false},
        ]
    },
    {
        question:"What is the primary hormone responsible for uterine contractions during labor?",
        answers: [
            { text: "Progesterone", correct: false},
            { text: "Prolactin", correct: false},
            { text: "Oxytocin", correct: true},
            { text: "Estrogen", correct: false},
        ]
    },
    {
        question:"The fetal head engaging in the pelvis is referred to as:",
        answers: [
            { text: "Descent", correct: false},
            { text: "Engagement", correct: true},
            { text: "Flexion", correct: false},
            { text: "Crowning", correct: false},
        ]
    },
    {
        question:"Which of the following is NOT a sign of placental separation?",
        answers: [
            { text: "Gush of blood", correct: false},
            { text: "Uterus becomes globular", correct: false},
            { text: "Lengthening of the umbilical cord", correct: false},
            { text: "Severe pain in the abdomen", correct: true},
        ]
    },
    {
        question:"What is the recommended position for a laboring woman during the second stage of labor?",
        answers: [
            { text: "Lithotomy position", correct: false},
            { text: "Supine position", correct: false},
            { text: "Upright or squatting position", correct: true},
            { text: "Trendelenburg position", correct: false},
        ]
    },
    {
        question:"The Apgar score is assessed at:",
        answers: [
            { text: "Birth and 1 minute", correct: false},
            { text: "5 and 10 minutes after birth", correct: false},
            { text: "1 and 5 minutes after birth", correct: true},
            { text: "10 and 15 minutes after birth", correct: false},
        ]
    },
    {
        question:"What is the normal frequency of uterine contractions during the active phase of the first stage of labor?",
        answers: [
            { text: "1–2 contractions per 10 minutes", correct: false},
            { text: "6–8 contractions per 10 minutes", correct: false},
            { text: "3–5 contractions per 10 minutes", correct: true},
            { text: "Continuous contractions", correct: false},
        ]
    },
    {
        question:"Which of the following positions is most commonly recommended for effective pushing during the second stage of labor?",
        answers: [
            { text: "Upright or squatting", correct: true},
            { text: "Side-lying", correct: false},
            { text: "Lithotomy", correct: false},
            { text: "Supine", correct: false},
        ]
    },
    {
        question:"What is the primary purpose of performing an episiotomy during labor?",
        answers: [
            { text: "To prevent uterine rupture", correct: false},
            { text: "To reposition the fetus", correct: false},
            { text: "To expedite the delivery process", correct: false},
            { text: "To reduce the risk of severe perineal tears", correct: true},
        ]
    },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if (score < questions.length){
        questionElement.innerHTML = `Yay, you scored ${score} out of ${questions.length}.`
    }else{
        questionElement.innerHTML = `Congrats for ${score} out of ${questions.length}, keep it up mate!`
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();
