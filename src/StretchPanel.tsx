import * as React from 'react';
import { Component } from 'react';
import { Motion, spring, presets, PlainStyle } from 'react-motion';

interface Props {
    title: string;
    bgcolor?: string;
    isExpanded?: boolean;
}

interface AppState {
    isOpen: boolean;
}

const styles = {
    defaultStyles: {
        height: '0%',
        position: 'absolute',
        color: 'white',
        padding: 10,
        background: '#A4C2DC',
        top: 0,
    } as React.CSSProperties
};

export default class StretchPanel extends Component<Props, AppState> {
    constructor() {
        super();

        this.state = { isOpen: false };
    }

    handleIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const {
            title,
        } = this.props;

        const {
            isOpen
        } = this.state;

        return (
            <Motion
                defaultStyle={{ height: isOpen ? 5 : 100 }}
                style={{ height: spring(isOpen ? 100 : 5, presets.gentle) }}
            >
                {
                    (interpolatingStyle: PlainStyle) => (
                        <div
                            onClick={this.handleIsOpen}
                            style={
                                {
                                    ...styles.defaultStyles,
                                    height: `${interpolatingStyle.height}%`,
                                }
                            }
                        >
                            <h2
                            >
                                {title}
                            </h2>
                            {isOpen && this.props.children}
                        </div>
                    )
                }
            </Motion>
        );
    }
}