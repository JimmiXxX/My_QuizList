const question =
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

const questionList = document.querySelector('.question');
const nxtBtn = document.querySelector('#next_button');
const quizAnswer = document.querySelector('#quiz_answer');
const quizTotal = document.querySelector('quiz_total')

let questionIndex = 0; // Текущий вопрос
let score = 0; // Счет

clearPage();
showQuestion();
nxtBtn.onclick = checkedBtn;


function clearPage(){
questionList.innerHTML = '';
quizAnswer.innerHTML = '';
}
function showQuestion()
{
    // Вывод вопроса
   const headerTemplate = `  <div class="question">%title%</div>`;
   const title = headerTemplate.replace('%title%', question[questionIndex]['question']);
   questionList.innerHTML = title;


    let answerCorrect = 1;

    for ([index, answerText] of question[questionIndex]['answer'].entries())
    {
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
        const answer = questionTemplate
                .replace('%answer%', answerText)
                .replace('%number%', answerCorrect);
        quizAnswer.innerHTML += answer;
        answerCorrect++;
    }

}

function checkedBtn()
{
    const checkedRadio = quizAnswer.querySelector('input:checked');
    if (checkedRadio)
        console.log('Все ок!')
    else
        alert('Выберите ответ!');

    //Проверяем ответ
    const userAnswer = parseInt(checkedRadio.value)

    console.log(userAnswer, question[questionIndex]['correct']);
    if (userAnswer === question[questionIndex]['correct'])
    {
        score++;
    }

    if (questionIndex !== question.length - 1)
    {
    questionIndex++;

    clearPage();
    showQuestion();
    }
    else
    {
    clearPage();
    showResults();
    }
}

function showResults()
{
console.log(score);
}
