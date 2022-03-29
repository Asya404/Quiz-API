let correctAnswer;

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
        console.log(possibleAnswers)
    });
}