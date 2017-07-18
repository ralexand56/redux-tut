import * as React from 'react';
import { Component } from 'react';
import { Motion, spring, presets, PlainStyle } from 'react-motion';

interface Props {
    strokeWidth?: number;
    radius?: number;
    width?: number;
    height?: number;
    pct: number;
}

export default class ArcControl extends Component<Props, {}> {

    render() {
        const {
            pct,
            width,
            height,
            radius,
            strokeWidth, } = this.props;

        let w = width || 100;
        let h = height || 100;
        let r = radius || 45;
        let sw = strokeWidth || 8;
        let cx = w / 2;
        let cy = h / 2;

        let deg = pct * 0.01 * 360;

        return (
            <svg
                width={`${w}px`}
                height={`${h}px`}
                style={{ backgroundColor: 'white' }}
            >
                <circle
                    cx={cx}
                    cy={cy}
                    fill="transparent"
                    stroke="#eee"
                    strokeWidth={sw}
                    r={radius || 45}
                />
                <Motion
                    defaultStyle={{ endAngle: 0 }}
                    style={{
                        endAngle: spring(
                            deg,
                            presets.noWobble,
                        )
                    }}
                >{
                        (interpolatingStyle: PlainStyle) =>
                            <g>
                                <path
                                    fill="transparent"
                                    stroke={this.getColor(interpolatingStyle.endAngle)}
                                    strokeLinecap="round"
                                    strokeWidth={sw}
                                    d={this.describeArc(cx, cy, r, 0, interpolatingStyle.endAngle)}
                                />
                                <text
                                    x={cx - 20}
                                    y={cy + 8}
                                    fontSize="1.5em"
                                    stroke="black"
                                >
                                    {pct}%
                                </text>
                            </g>
                    }
                </Motion>
            </svg>
        );
    }

    polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    getColor(val: number): string {
        let col = '#f00';

        if (val > 130) {
            col = '#faff00';
        }

        if (val > 270) {
            col = '#0f0';
        }
        
        return col;
    }

    describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {

        let start = this.polarToCartesian(x, y, radius, endAngle);
        let end = this.polarToCartesian(x, y, radius, startAngle);

        let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        var d = [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');

        return d;
    }
}