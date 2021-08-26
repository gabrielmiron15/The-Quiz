import React, { useEffect, useState, useContext } from 'react';
import { Select, Heading } from 'grommet';
import Context from '../store/Context';

function QuestionsSettings() {
    const [numberOfQuestions, setNumberOfQuestions] = useState<String>('10');
    const [difficulty, setDifficulty] = useState<String>('Easy');
    const [questionType, setQuestionType] = useState<String>('Any Type');
    const { setSettings } = useContext(Context);

    useEffect(() => {
        setSettings(numberOfQuestions, difficulty, questionType);
    }, [numberOfQuestions, difficulty, questionType]);
    return (
        <>
            <Heading level={3} margin="none">Configure the questions</Heading>
            <div className="container-settings">
                <div className="setting-item">
                    <Heading level={4} margin="none">Number of questions</Heading>
                    <Select
                        options={['10', '15', '20']}
                        value={numberOfQuestions}
                        onChange={({ option }) => setNumberOfQuestions(option)}
                    />
                </div>
                <div className="setting-item">
                    <Heading level={4} margin="none">Difficulty</Heading>
                    <Select
                        options={['Easy', 'Medium', 'Hard']}
                        value={difficulty}
                        onChange={({ option }) => setDifficulty(option)}
                    />
                </div>
                <div className="setting-item">
                    <Heading level={4} margin="none">Question Type</Heading>
                    <Select
                        options={['Any Type', 'Multiple Choice', 'True/False']}
                        value={questionType}
                        onChange={({ option }) => setQuestionType(option)}
                    />
                </div>
            </div>
        </>
    );
}

export default QuestionsSettings;
