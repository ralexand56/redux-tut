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

        if (typeof children === 'string') {
            return null;
        }

        return (
            <div>
                {
                    this.renderChildren(React.Children.toArray(children))
                }
            </div>
        );
    }

    renderChildren(children: React.ReactChild[]) {
        if (!children) {
            return null;
        }

        return children.map((child: React.ReactChild, i) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return null;
            }

            return React.cloneElement(child, {...child.props,  key: i, className: 'gs' });
        });
    }
}