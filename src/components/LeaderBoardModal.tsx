import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Heading, List } from 'grommet';

function LeaderBoardModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const leaderBord: string = localStorage.getItem('leaderBoard')!;
        if (leaderBord) {
            const leaders = JSON.parse(leaderBord);
            setData(leaders);
        }
    }, []);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<span className="color-primary text">Show Leaderboard</span>}
        >
            <Modal.Header>LeaderBoard</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Heading level={3} className="title">Here are the previous scores of the users</Heading>
                </Modal.Description>
                <div className="score-list">
                    {!data?.length && 'No data found'}
                    {data && <List
                        primaryKey="name"
                        secondaryKey="score"
                        data={data.map(item => ({
                            name: item?.name,
                            score: `${item?.score}/${item?.totalQuestions}`
                        }))}
                    />}
                </div>

            </Modal.Content>

            <Modal.Actions>
                <Button onClick={() => setOpen(false)} className="background-color-primary">Close</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default LeaderBoardModal;