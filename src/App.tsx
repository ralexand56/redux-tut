import * as React from 'react';
import Staggered from './Staggered';
import ArcControl from './ArcControl';
import './App.css';
import Iconic from './Iconic';
import { Motion, spring, presets } from 'react-motion';
import Stagger from './Stagger';
import StretchPanel from './StretchPanel';

interface State {
    activeTopicID: number;
    alternate: boolean;
    isOpen: boolean;
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

        this.state = { activeTopicID: 1, alternate: true, isOpen: true };
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
        // window.setTimeout(() => {
        //     this.setState({ ...this.state, alternate: !this.state.alternate });
        // }, 0);
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
                                <Staggered textSize={1}>
                                    {`${t.id}. ${t.title}`}
                                </Staggered>
                            </h1>
                        }
                    </Motion>))}
                <Iconic
                    text="IR"
                    fontSize={1.5}
                    backgroundColor="pink"
                    borderColor="red"
                />
                <StretchPanel
                    title="Department Databases"
                    isExpanded={this.state.isOpen}
                >
                        <p>
                            How are you doing this?
                        </p>
                </StretchPanel>
                <pre style={{ backgroundColor: '#ccc', borderLeft: '7px solid', padding: 10, borderRadius: 5 }}>
                    <code>
                        {`<VideoPlayer
                            ref="videoplayer"
                            preload={this.props.preload}
                            classes={this.props.classes}
                            videoID={this.props.videoID}
                            controls="controls"
                        />`}
                    </code>
                </pre>
                <Stagger>
                    <ArcControl
                        pct={89}
                    />
                    <ArcControl
                        pct={29}
                    />
                    <ArcControl
                        pct={50}
                    />
                </Stagger>
            </div>
        );
    }
}