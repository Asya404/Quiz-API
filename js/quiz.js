let correctAnswer,
    correctNumber = (localStorage.getItem('quiz_correct') ? localStorage.getItem('quiz_correct') : 0),
    incorrectNumber = (localStorage.getItem('quiz_incorrect') ? localStorage.getItem('quiz_incorrect') : 0);
// if LS isn't empty put LS score, if empty 0


document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
})



// load a new question from an API
const loadQuestion = () => {
    fetch('https://opentdb.com/api.php?amount=1')
        .then(response => response.json())
        .then(data => displayQuestion(data.results));
}



displayQuestion = questions => {
    const div = document.createElement('div');
    div.classList.add('question');
    questions.forEach(question => {

        // We insert right answer into array with splice (push will insert always on the last position)
        // 0 means we ADD el, by calculated random index
        correctAnswer = question.correct_answer;
        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice(Math.floor(Math.random() * 3), 0, correctAnswer)

        // html with question and totals
        const div = document.createElement('div');
        div.classList.add('questions');
        div.innerHTML = `
        <div class="totals">
            <span class="success">${correctNumber}</span>
            <span class="danger">${incorrectNumber}</span>
        </div>
        <div class="question">
            <h2 class="heading-secondary">${question.question}</h2>
            <div class="symbol">?</div>
        </div>
        `

        // generate html for possible answers, then checkAnswer on click
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('li');
            answerHTML.textContent = answer;
            div.appendChild(answerHTML);
            answerHTML.addEventListener('click', checkAnswer);
        })
        document.querySelector('#app').appendChild(div);
    });
}



checkAnswer = (e) => {
    const okAnswer = document.querySelector('.correct');
    const errorAnswer = document.querySelector('.error');

    // remove previous result
    if (okAnswer) {
        okAnswer.classList.remove('correct')
    } else if (errorAnswer) {
        errorAnswer.classList.remove('error')
    }

    if (e.target.textContent === correctAnswer) {
        e.target.classList.add('correct');
        correctNumber++;
    } else {
        e.target.classList.add('error');
        incorrectNumber++;
    }

    // save into local storage
    saveLS()

    // clear previous result from html, then load a new question
    setTimeout(function(){
        const app = document.querySelector('#app');
        if(app.firstChild) {
            app.removeChild(app.firstChild);
        }
        loadQuestion();
    },1000)
}

saveLS = () => {
    localStorage.setItem('quiz_correct', correctNumber);
    localStorage.setItem('quiz_incorrect', incorrectNumber)
}