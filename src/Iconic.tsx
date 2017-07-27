import * as React from 'react';
import { Component } from 'react';
import { Motion, spring, presets, PlainStyle } from 'react-motion';

interface Props {
    text: string;
    fontSize?: number;
    backgroundColor?: string;
    borderColor?: string;
}

export default class Iconic extends Component<Props, {}> {

    render() {
        let {
            fontSize,
            backgroundColor,
            borderColor,
            text,
        } = this.props;

        fontSize = fontSize || 1.1;

        return (
            <Motion
                defaultStyle={{
                    scale: 0.5,
                    tY: -70
                }}
                style={{
                    scale: spring(
                        1,
                        presets.wobbly
                    ),
                    tY: spring(
                        0,
                        presets.wobbly,
                    )
                }}
            >
                {
                    (interpolatingStyle: PlainStyle) =>
                        <div
                            style={{
                                borderRadius: 5,
                                boxShadow: 'inset 0px 0px 1px black, 0px 0px 1px black',
                                fontFamily: 'Arial',
                                position: 'relative',
                                color: borderColor,
                                display: 'inline-block',
                                fontSize: `${fontSize}em`,
                                fontWeight: 'bold',
                                overflow: 'hidden',
                                backgroundColor: backgroundColor || 'white',
                                border: `${0.2}em solid ${borderColor || 'black'}`,
                                margin: 5,
                                padding: '5px',
                                textShadow: '1px 1px 1px black',
                                width: '37',
                                height: '25',
                                transform: `scale(${interpolatingStyle.scale})`
                            } as React.CSSProperties}
                        >
                            <span
                                style={
                                    {
                                        transform: `translateY(${interpolatingStyle.tY}px)`
                                    } as React.CSSProperties}
                            >
                                {text}
                            </span>
                        </div>
                }
            </Motion >
        );
    }
}