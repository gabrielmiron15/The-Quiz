import React, { ReactElement, useState } from 'react';
import Context from './Context';


const getQuestionTypeValue = (qType: string) => {
    switch (qType) {
        case 'Multiple Choice':
            return 'multiple';
        case 'True/False':
            return 'boolean';
        default:
            return '';
    }
}

const Provider = (
    {
        children
    }: {
        children: ReactElement
    }
) => {
    const [stateSettings, setStateSettings] = useState<any>({
        amount: 10, difficulty: 'easy', type: 'multiple'
    });
    const [questions, setQuestions] = useState<any[]>([]);
    const [modalSubmit, setModalSubmit] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<Number>(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [scoreData, setScoreData] = useState<any>({});
    const [modalScore, setModalScore] = useState<boolean>(false);
    const setDefaultData = () => {
        setQuestions([]);
        setCurrentQuestion(0);
        setQuestions([]);
        setAnswers([]);
        setStateSettings({
            amount: 10, difficulty: 'easy', type: 'multiple'
        });
    }
    const setSettings = (amount: string, difficulty: string, type: string) => {
        setStateSettings({
            amount: Number(amount),
            difficulty: difficulty.toLowerCase(),
            type: getQuestionTypeValue(type)
        })
    };
    const answerToQuestion = (response: any, index: number) => {
        const answer = answers?.find(answer => answer?.id === index);
        if (answer?.response) {
            const newAnswers = answers.map(ans => {
                if (ans?.id === index) {
                    return {
                        ...ans,
                        response
                    }
                }
                return ans;
            });
            setAnswers(newAnswers);
        } else {
            setAnswers([
                ...answers,
                {
                    id: index,
                    response
                }])
        }
        const q = [...questions];
        q[index] = {
            ...q[index],
            answered: true
        }
        setQuestions(q);
    }
    const preSubmitQuestions = () => {
        setModalSubmit(true);
    }

    const submitQuestions = (name: string) => {
        let score = 0;
        answers.forEach(answer => {
            console.log(answer, questions[answer.id])
            if (answer.response === questions[answer.id].correct_answer) {
                score++;
            }
        });
        setScoreData({
            score,
            totalQuestions: questions?.length,
            name: name || 'User'
        });
        const setLocalFromEmpty = () => localStorage.setItem('leaderBoard', JSON.stringify([
            {
                score,
                totalQuestions: questions?.length,
                name: name || 'User'
            }
        ]))
        const leaderBord: string = localStorage.getItem('leaderBoard')!;
        if (leaderBord) {
            const leaders = JSON.parse(leaderBord);
            if (leaders.length) {
                localStorage.setItem('leaderBoard', JSON.stringify([
                    ...leaders,
                    {
                        score,
                        totalQuestions: questions?.length,
                        name: name || 'User'
                    }
                ]))
            }
            else {
                setLocalFromEmpty();
            }
        }
        else {
            setLocalFromEmpty();
        }
        setModalSubmit(false);
        setModalScore(true);
    }

    const getNextQuestionIndex = () => {
        const nextQuestion = questions.find(q => !q?.answered);
        return questions?.indexOf(nextQuestion);
    }
    return (
        <Context.Provider
            value={{
                setDefaultData,
                settings: stateSettings,
                setSettings,
                questions,
                setQuestions,
                currentQuestion,
                setCurrentQuestion,
                answers,
                answerToQuestion,
                preSubmitQuestions,
                getNextQuestionIndex,
                modalSubmit,
                setModalSubmit,
                submitQuestions,
                scoreData,
                modalScore,
                setModalScore
            }}
        >
            {children}
        </Context.Provider>
    );
}
export default Provider;