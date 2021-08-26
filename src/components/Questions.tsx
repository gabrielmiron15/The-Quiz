import React, { useContext, useEffect, useState } from 'react';
import { Heading, RadioButtonGroup, Button } from 'grommet';
import Context from '../store/Context';
function Questions() {

    const { questions, currentQuestion, setCurrentQuestion, answerToQuestion, answers, preSubmitQuestions, getNextQuestionIndex } = useContext(Context);
    const question = questions.find((_: any, index: number) => index === currentQuestion);
    const [response, setResponse] = useState<any>('');

    useEffect(() => {
        const ans = answers?.find((a: any) => a?.id === currentQuestion);
        if (ans?.response) {
            setResponse(ans?.response);
        }
        else {
            setResponse('');
        }
    }, [currentQuestion]);
    const labelForAnswer = `${answers.length !== questions.length ? 'Answer and go to next question' : 'Submit'}`

    return (
        <div>
            <div>
                <Heading level={3}><p dangerouslySetInnerHTML={{ __html: question?.question }}></p></Heading>
                {question?.type === 'multiple' && (
                    <RadioButtonGroup
                        name="multiple-choise"
                        options={[...question.incorrect_answers, question.correct_answer]}
                        value={response}
                        onChange={(event) => {
                            setResponse(event.target.value);
                            answerToQuestion(event.target.value, currentQuestion);
                        }}
                    />
                )}
                {question?.type === 'boolean' && (
                    <RadioButtonGroup
                        name="multiple-choise"
                        options={['True', 'False']}
                        value={response}
                        onChange={(event) => {
                            setResponse(event.target.value);
                            answerToQuestion(event.target.value, currentQuestion);
                        }}
                    />
                )}
                <div className="buttons-wrapper">
                    <Button primary disabled={currentQuestion === 0} label="Go to previous question" onClick={() => {
                        if (currentQuestion > 0) {
                            setCurrentQuestion(currentQuestion - 1);
                        }
                    }} />
                    <Button primary disabled={!response} label={labelForAnswer} onClick={() => {
                        if (answers.length === questions.length) {
                            preSubmitQuestions();
                            return;
                        }
                        if (questions?.[currentQuestion + 1]?.answered || currentQuestion + 1 === questions.length) {
                            const nextQuestion = getNextQuestionIndex();
                            if (nextQuestion != -1) {
                                setCurrentQuestion(nextQuestion);
                            }
                            return;
                        }
                        if (currentQuestion < questions?.length - 1) {
                            setCurrentQuestion(currentQuestion + 1);
                        }
                    }} />
                </div>
                <div>Question {`${currentQuestion + 1}/${questions?.length}`}</div>
            </div>
        </div>
    );
}

export default Questions;
