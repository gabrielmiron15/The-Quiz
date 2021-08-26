import React, { useContext, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Heading, Meter } from 'grommet';
import Context from '../store/Context';

function ModalScore() {
    const { modalScore, setModalScore, scoreData } = useContext(Context);

    return (
        <Modal
            onClose={() => setModalScore(false)}
            onOpen={() => setModalScore(true)}
            open={modalScore}
        >
            <Modal.Header>Score</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Heading level={3} className="title">You are the best {scoreData.name}!!!!</Heading>
                </Modal.Description>
                <Heading level={4} className="title">Total correct answers: {scoreData?.score} of {scoreData?.totalQuestions}</Heading>
                <Meter
                    values={[{
                        value: scoreData.score * 100 / scoreData?.totalQuestions,
                        label: 'Progress',
                        onClick: () => { }
                    }]}
                    color="#7d4bda"
                    aria-label="meter"
                />
            </Modal.Content>

            <Modal.Actions>
                <Button onClick={() => setModalScore(false)} className="background-color-primary">Close</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalScore