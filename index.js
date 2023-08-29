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
            question: "Какой мой любимый цвет?",
            answer: ["Красный", "Черный", "Желтый", "Зеленый", "Фиолетовый"],
            correct: 4,
        },
        {
            question: "Что я люблю больше?",
            answer: ["Огурцы", "Помидоры", "Груши", "Яблоки"],
            correct: 3,
        },
        {
            question: "Где я учился?",
            answer: ["СибГУТИ", "НГУ", "МГУ", "Без образования"],
            correct: 1,
        },
        {
            question: "Яичница или омлет?",
            answer: ["Омлет", "Яичница"],
            correct: 1,
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

const resultTemplate =
    `
    <div class="quiz_list">%title%</div>
    <div class="quiz_list">%message%</div>
    <div class="quiz_list">%result%</div>
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
    let title, message

    if (score === questions.length)
    {
        title = 'Отлично!'
        message = 'Все ответы правильные'
    }else if((score * 100)/questions.length >=50)
    {
        title = 'Неплохой результат'
        message = 'Вы ответили более 50% правильно!'
    }else if((score * 100)/questions.length <= 30)
    {
        title = 'Стоит лучше меня узнать'
        message = 'Ответов меньше 30%(('
    }

    let result = `${score} из ${questions.length}`

    quizAnswer.innerHTML = resultTemplate
            .replace('%title%', title)
            .replace('%message%', message)
            .replace('%result%', result)
    nxtBtn.innerHTML = 'Попробовать снова'
    nxtBtn.onclick = () => history.go()
}








