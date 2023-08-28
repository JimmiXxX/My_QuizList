const questions =
    [
        {
            question: "Когда я родился?",
            answer: ["1999", "1992", "1993", "1832"],
            correct: 1,
        },
        {
            question: "Как меня зовут?",
            answer: ["Леша", "Витя", "Артем", "Игорь"],
            correct: 4,
        },
        {
            question: "Где я родился?",
            answer: ["Питер", "Усть-Илимск", "Россия", "Вьетнам"],
            correct: 2,
        }
    ];

const questionList = document.querySelector('.question')
const nxtBtn = document.querySelector('#next_button')
const quizAnswer = document.querySelector('#quiz_answer')
const quizTotal = document.querySelector('.quiz_total')
const quizBar = document.querySelector('.progress_bar_linear')

//Вывод ответов
const questionTemplate =
    ` 
                <label>
                     <li class="quiz_option">
                         <input value="%number%" type="radio" class="input_text" name="answer">
                         <p>%answer%</p>
                     </li>
                </label>
            `

const headerTemplate = `  <div class="question">%title%</div>`;
let questionIndex = 0; // Текущий вопрос
let score = 0; // Счет

clearPage();
showQuestion();
nxtBtn.onclick = checkedBtn;


function clearPage() {
    questionList.innerHTML = '';
    quizAnswer.innerHTML = '';
}

function showQuestion() {
    calcProgresBar()
    quizTotal.innerHTML = '%corrent/%last'
        .replace('%corrent', questionIndex + 1)
        .replace('%last', questions.length)
    const question = questions[questionIndex];
    questionList.innerHTML = headerTemplate.replace('%title%', question['question']);
    question.answer.forEach((answer, idx) => {
        const answerHTML = questionTemplate
            .replace('%answer%', answer)
            .replace('%number%', idx + 1);
        quizAnswer.innerHTML += answerHTML;
    })


}

function calcProgresBar()
{
    const prozent = Math.ceil(((questionIndex + 1) / questions.length) * 100)
    quizBar.style.width = prozent + '%'
}

function checkedBtn() {
    const checkedRadio = quizAnswer.querySelector('input:checked');
    if (checkedRadio)
        console.log('Все ок!')
    else
        alert('Выберите ответ!');

    //Проверяем ответ
    const userAnswer = parseInt(checkedRadio.value)

    console.log(userAnswer, questions[questionIndex]['correct']);
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    if (questionIndex !== questions.length - 1) {
        questionIndex++;

        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    console.log(score);
}








