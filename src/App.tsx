import * as React from 'react';
import './App.css';
import { Motion, StaggeredMotion, PlainStyle, spring, presets } from 'react-motion';

interface State {
    activeTopicID: number;
    alternate: boolean;
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

        this.state = { activeTopicID: 1, alternate: true };
    }

    handleKeyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 39 && this.state.activeTopicID < topics.length) {
            this.setState({ activeTopicID: this.state.activeTopicID + 1 });
        }

        if (e.keyCode === 37 && this.state.activeTopicID > 1) {
            this.setState({ activeTopicID: this.state.activeTopicID - 1 });
        }
    }

    handleRest = () => {
        window.setTimeout(() => {
            this.setState({ ...this.state, alternate: !this.state.alternate });
        },                0);
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
                        style={{ height: spring(this.state.alternate ? 0 : 100, presets.wobbly), opacity: spring(1.0) }}
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
                                {t.id}. {t.title}
                            </h1>}
                    </Motion>))}
                <StaggeredMotion
                    defaultStyles={[{ h: 0 }, { h: 0 }, { h: 0 }]}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles!.map((_, i) => {
                        return i === 0
                            ? { h: spring(100) }
                            : { h: spring(prevInterpolatedStyles![i - 1].h) };
                    })}
                >
                    {(interpolatingStyles: PlainStyle[]) =>
                        <div>
                            {interpolatingStyles.map((style, i: number) =>
                                <div key={i} style={{ border: '1px solid', margin: 5, height: style.h }} />)
                            }
                        </div>
                    }
                </StaggeredMotion>
            </div>
        );
    }
}