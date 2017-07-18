import * as React from 'react';
import * as Redux from 'redux';
// import { Action } from 'redux';
import './App.css';
import { Motion, spring, presets } from 'react-motion';
import Staggered from './Staggered';
// import ArcControl from './ArcControl';
import Page from './pages';
import { Lie } from './pages';
import { composeWithDevTools } from 'redux-devtools-extension';

interface State {
    activeTopicID: number;
    currPageNo: number;
    max: number;
    topics: { [id: number]: Topic };
}

interface Topic {
    id: number;
    title: string;
    description?: string;
    code?: string;
    pages?: JSX.Element[];
    isVisible?: boolean;
    isActive?: boolean;
}

export type KnownAction =
    IncrementAction |
    DecrementAction |
    NextPageAction |
    PreviousPageAction;

export interface IncrementAction {
    type: 'INCREMENT';
}
export interface DecrementAction {
    type: 'DECREMENT';
}

export interface NextPageAction {
    type: 'NEXT_PAGE';
}
export interface PreviousPageAction {
    type: 'PREVIOUS_PAGE';
}

const nextPage = (maxPage) => {
    
};

const topics: { [id: number]: Topic } = {
    1: {
        id: 1,
        title: 'The Rise and Fall and Rise Again of Functional Programming',
    },
    2: {
        id: 2,
        title: 'The Importance of Immutability'
    },
    3: {
        id: 3,
        title: 'Redux: The Ultimate State Management Machine',
        pages: [<Page />,
        <Lie />]
    },
    4: {
        id: 4,
        title: 'The React Redux Connection',
    },
    5: {
        id: 5,
        title: 'React Redux Best Practices',
    },
};

export default class App extends React.Component<{}, State> {
    store: Redux.Store<State>;

    constructor() {
        super();

        this.store = Redux.createStore(this.pager, composeWithDevTools());

        this.state = this.store.getState();
        this.store.subscribe(this.handleStateChanges);
    }

    handleStateChanges = () => {
        this.setState(this.store.getState());
    }

    handleKeyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 39 && this.state.activeTopicID < this.state.max) {
            this.store.dispatch({ type: 'INCREMENT' });
        }

        if (e.keyCode === 37 && this.state.activeTopicID > 1) {
            this.store.dispatch({ type: 'DECREMENT' });
        }
    }

    componentWillMount() {
        window.addEventListener('keyup', this.handleKeyUp);
    }

    render() {
        let activeTopic = topics[this.state.activeTopicID];

        return (
            <div className="App">
                <Motion
                    key={activeTopic.id}
                    defaultStyle={{ height: 30, opacity: 0 }}
                    style={{ height: spring(0, presets.wobbly), opacity: spring(1.0) }}
                >
                    {value =>
                        <h1
                            style={
                                {
                                    opacity: value.opacity,
                                    transform: `translateY(${value.height}px)`,
                                    overflow: 'hidden'
                                }}
                        >
                            <Staggered textSize={1}>
                                {`${activeTopic.id}. ${activeTopic.title}`}
                            </Staggered>
                        </h1>
                    }
                </Motion>
                {
                    activeTopic.pages && activeTopic.pages[0]
                }
            </div>
        );
    }

    pager = (state: State, action: KnownAction) => {
        if (typeof state === 'undefined') {
            return {
                activeTopicID: 1,
                max: 5,
                currPageNo: 0,
                topics: topics,
            };
        }
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, activeTopicID: state.activeTopicID + 1 };
            case 'DECREMENT':
                return { ...state, activeTopicID: state.activeTopicID - 1 };
            default:
                return state;
        }
    }
}