<?php
    include 'php/db-connect.php';
    include 'php/functions.php';
    session_start();
    updateData();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Quizza</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="page">
        <div id="topContainer">
            <div id="logo">QUIZZA</div>
            <input type="text" id="searchBar" placeholder="Search.." oninput="handleSearchInput(event)">
            <div id="iconsContainer"></div>
        </div>
        <div id="mainDisplay">
            <div id="sideIconContainer"></div>
            <div class="masterCreateContainer">
                <div class="quizHeader-create">
                    <span>Total: 0</span>
                    <button class="finishBtn">Finish</button>
                </div>
                <div class="quizQuestions">
                    
                </div>
                <button class="addQuestionBtn">+</button>   
            </div>
        </div>
    </div>
    <div id="createQuestion" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content-createquiz">
            <span class="close">&times;</span>
            <div class="modal-body">
                <div class="questions-insert">
                    <input type="text" placeholder="Question" class="questionInput" id="question-title">
                    <input type="text" placeholder="Answer" class="answerInput" id="answer-1">
                </div>
                <button class="insertQuestion">ADD</button>
                <button class="addQuestion">+</button>
            </div>
        </div>

    </div>
</body>
</html>

<script> 
    let currentAnswer = 1;
    let currentQuestion = 0;
    let createModal = document.getElementById('createQuestion');
    let addQuestionBtn = document.querySelector('.addQuestionBtn'); 
    let insertQuestion = document.querySelector('.insertQuestion');
    let addQuestion = document.querySelector('.addQuestion');
    let finishBtn = document.querySelector('.finishBtn');

    finishBtn.addEventListener('click', () => {
        let questions = document.querySelectorAll('.questionItem');
        let quiz = [];
        questions.forEach(question => {
            let questionText = question.querySelector('span').innerText;
            let selectElement = question.querySelector('select');
            let options = selectElement.querySelectorAll('option');
            let allAnswers = [];
            options.forEach(opt => {
                allAnswers.push(opt.value);
            });
            let correctText = selectElement.options[selectElement.selectedIndex].innerText;
            quiz.push({
                question: questionText,
                answers: allAnswers,
                correctAnswer: correctText
            });
        });
        console.log(quiz);
        fetch('php/createQuiz.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quiz })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    });

    addQuestion.addEventListener('click', () => {
        if (currentAnswer >= 4) {
            return;
        }
        currentAnswer++;
        let modal = document.querySelector('.questions-insert');
        let answerInput = document.createElement('input');

        answerInput.id = `answer-${currentAnswer}`;
        answerInput.type = 'text';
        answerInput.placeholder = 'Answer';        
        
        modal.appendChild(answerInput);
    });

    addQuestionBtn.addEventListener('click', () => {
        createModal.style.display = 'block';
    });

    let closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        createModal.style.display = 'none';
    });

    function resetModal() {
        let modal = document.querySelector('.questions-insert');
        let inputs = modal.querySelectorAll('input');



        inputs.forEach(input => {
            if (input.id !== 'answer-1' && input.id !== 'question-title') {
                input.remove();
            }
            input.value = '';
        });
        currentAnswer = 1;
    }

    insertQuestion.addEventListener('click', () => {
        let question = document.querySelector('.questionInput').value;
        
        if (currentAnswer < 2) {
            return;
        }

        if (question.length < 5 || question.length > 40) {
            return;
        }

        let answers = [];
        for (let i = 1; i <= currentAnswer; i++) {
            let answer = document.querySelector(`#answer-${i}`).value;
            answers.push(answer);
        }

        let quizQuestions = document.querySelector('.quizQuestions');
        let questionItem = document.createElement('div');
        questionItem.classList.add('questionItem');
        let questionSpan = document.createElement('span');
        questionSpan.innerText = question;
        questionItem.appendChild(questionSpan);
        let select = document.createElement('select');

        for (let i = 0; i < answers.length; i++) {
            let option = document.createElement('option');
            option.value = answers[i];
            option.innerText = answers[i];
            select.appendChild(option);
        }
        questionItem.appendChild(select);
        quizQuestions.appendChild(questionItem);
        createModal.style.display = 'none';
        resetModal()
        currentQuestion++;
        document.querySelector('.quizHeader-create span').innerText = `Total: ${currentQuestion}`;

    });
</script>
