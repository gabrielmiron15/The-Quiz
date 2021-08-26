import React, { useContext, useEffect, useState } from 'react';
import { Heading, Box, Spinner, Clock, Anchor } from 'grommet';
import Context from '../store/Context';
import { getQuestions } from '../api/index';
import Questions from './Questions';
import ModalSubmit from './ModalSubmit';
function Quiz() {

    const { settings, questions, setQuestions, currentQuestion, setCurrentQuestion } = useContext(Context);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const getQuestionsAsyncFunction = async () => {
        setIsLoading(true);
        const res = await getQuestions(settings);
        setIsLoading(false);
        setQuestions(res.results);
    }
    useEffect(() => {
        getQuestionsAsyncFunction();
    }, []);

    return (
        <div className="app">
            <Box
                direction="row"
                border={{ color: 'brand', size: 'large' }}
                pad="medium"
                className="flex-column"
            >
                {isLoading && <div className="spinner-container"><Spinner size="large" /></div>}
                {!isLoading && (
                    <div>
                        <div className="clock-wrapper">
                            <Clock type="digital" run="backward" time="T00:15:00" />
                        </div>
                        <div>
                            <Heading level={4}>Please answer the following question</Heading>
                        </div>

                        <div>
                            <Questions />
                        </div>
                        <div>
                            <ul className="ul-answers">
                                {questions.map((question: any, index: number) => {
                                    return <li key={question.question} className={currentQuestion === index ? 'active' : ''} onClick={() => {
                                        setCurrentQuestion(index)
                                    }}>{index + 1}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                <ModalSubmit />
                <Anchor href='/' label="Go to homepage" />
            </Box>
        </div>
    );
}

export default Quiz;
