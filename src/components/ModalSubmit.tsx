import React, { useContext, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Heading, TextInput } from 'grommet';
import { useHistory } from "react-router-dom";
import Context from '../store/Context';

function ModalSubmit() {
    const { modalSubmit, setModalSubmit, answers, questions, submitQuestions } = useContext(Context);
    const history = useHistory();
    const [name, setName] = useState<string>('');
    console.log(name);

    return (
        <Modal
            onClose={() => setModalSubmit(false)}
            onOpen={() => setModalSubmit(true)}
            open={modalSubmit}
        >
            <Modal.Header>Submit your answers</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Heading level={3} className="title">Are you sure that you want to submit your answer?</Heading>
                </Modal.Description>
                <Heading level={4} className="title">Total answered questions:{answers?.length} of {questions?.length}</Heading>
            </Modal.Content>
            <Modal.Content>
                <Heading level={4} className="title">Please enter your name</Heading>
                <TextInput id="text-input-id"
                    name="name"
                    placeholder="Name"
                    style={{ width: '200px' }}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setModalSubmit(false)}>Cancel</Button>
                <Button onClick={() => {
                    submitQuestions(name);
                    history.push('/');
                }} className="background-color-primary">
                    Submit
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalSubmit