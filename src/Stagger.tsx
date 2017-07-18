import * as React from 'react';
import { Component } from 'react';
import { TweenMax } from 'gsap';

export default class Stagger extends Component<{}, {}> {
    node: React.ReactNode;

    componentDidMount() {
        TweenMax.staggerFrom('.gs', 1, { autoAlpha: 0 }, 0.3);
    }

    render() {
        let { children } = this.props;

        if (!Array.isArray(children)) {
            return null;
        }

        return (
            <div>
                {
                    children && children.map((child, i) => <div key={i} className="gs">{child}</div>)}
            </div>
        );
    }
}