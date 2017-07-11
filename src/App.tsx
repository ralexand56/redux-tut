import * as React from 'react';
import './App.css';
import { Motion, spring, presets } from 'react-motion';

interface State {
    activeTopicID: number;
}

interface Topic {
    id: number;
    title: string;
    description?: string;
    code?: string;
    pages?: Element[];
    isVisible?: boolean;
    isActive?: boolean;
}

const topics: Topic[] = [
    {
        id: 1,
        title: 'The Rise and Fall and Rise Again of Functional Programming',
    },
    {
        id: 2,
        title: 'The Importance of Immutability'
    },
    {
        id: 3,
        title: 'Redux: The Ultimate State Management Machine',
    },
    {
        id: 4,
        title: 'The React Redux Connection',
    },
    {
        id: 5,
        title: 'React Redux Best Practices',
    },
];

export default class App extends React.Component<{}, State> {
    constructor() {
        super();

        this.state = { activeTopicID: 1 };
    }

    handleKeyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 39 && this.state.activeTopicID < topics.length) {
            this.setState({ activeTopicID: this.state.activeTopicID + 1 });
        }

        if (e.keyCode === 37 && this.state.activeTopicID > 1) {
            this.setState({ activeTopicID: this.state.activeTopicID - 1 });
        }
    }

    componentWillMount() {
        window.addEventListener('keyup', this.handleKeyUp);
    }

    render() {
        return (
            <div className="App">
                {topics.map(t => this.state.activeTopicID === t.id &&
                    (<Motion
                        key={t.id}
                        defaultStyle={{ height: 100, opacity: 0 }}
                        style={{ height: spring(0, presets.wobbly), opacity: spring(1.0) }}
                    >
                        {value =>
                            <h1
                                style={
                                    { 
                                      opacity: value.opacity, 
                                      transform: `translateY(${value.height}px)`, 
                                      overflow: 'hidden' }}
                            >
                                {t.id}. {t.title}
                            </h1>}
                    </Motion>))}
            </div>
        );
    }
}