import React, { useEffect, useContext } from 'react';
import { Heading, Box, Button, WorldMap } from 'grommet';
import { useHistory } from "react-router-dom";
import QuestionsSettings from './QuestionsSettings';
import ModalScore from './ModalScore';
import Context from '../store/Context';
import LeaderBoardModal from './LeaderBoardModal';

function Homepage() {
    const history = useHistory();
    const { setDefaultData } = useContext(Context);
    useEffect(() => {
        setDefaultData();
    }, [])

    return (
        <div className="app">
            <Box
                direction="row"
                border={{ color: 'brand', size: 'large' }}
                pad="medium"
                className="flex-column"
            >
                <div>
                    <Heading level={1} className="title">Welcome to "The Quiz"</Heading>
                </div>
                <div>
                    <WorldMap
                        color="neutral-1"
                        continents={[
                            {
                                name: 'Europe',
                                color: 'light-5',
                                onClick: (name) => { },
                            },
                        ]}
                        places={[
                            {
                                name: 'Sydney',
                                location: [-33.8830555556, 151.216666667],
                                color: 'accent-2',
                                onClick: (name) => { },
                            },
                        ]}
                    />
                </div>
                <div>
                    <QuestionsSettings />
                </div>
                <div className="button-wrapper">
                    <Button primary label="Start the quiz" onClick={() => {
                        history.push('/quiz');
                    }} />
                </div>
                <LeaderBoardModal />
            </Box>
            <ModalScore />
        </div>
    );
}

export default Homepage;
