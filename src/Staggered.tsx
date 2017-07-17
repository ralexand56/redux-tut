import *  as React from 'react';
import { Component } from 'react';
import { StaggeredMotion, PlainStyle, spring } from 'react-motion';

interface Props {
    textSize?: number;
}

export default class Staggered extends Component<Props, {}> {

    render() {
        const { children } = this.props;

        if (children && (Array.isArray(children) || typeof children === 'string')) {
            return (
                <StaggeredMotion
                    defaultStyles={this.getDefaultStyles(children)}
                    styles={
                        prevInterpolatedStyles => prevInterpolatedStyles!.map((_, i) => {
                            return i === 0
                                ? { opacity: spring(1, { stiffness: 2, damping: 20, precision: 1 }) }
                                : { opacity: spring(prevInterpolatedStyles![i - 1].opacity, { 
                                    stiffness: 20, damping: 2, precision: 1 }) };
                        })
                    }
                >
                    {
                        (interpolatingStyles: PlainStyle[]) =>
                            <div>
                                {
                                    this.renderChildren(interpolatingStyles, children)
                                }
                            </div>
                    }
                </StaggeredMotion>
            );
        } else {
            return null;
        }
    }

    renderChildren = (styles: PlainStyle[], Children: React.ReactNode) => {
        if (Children) {
            if (typeof Children === 'string') {
                const strArr = Children.split('');
                const { textSize } = this.props;

                return styles.map((style, i) => (
                    <span
                        key={i}
                        style={{ opacity: style.opacity, fontSize: textSize ? `${textSize}em` : `2em` }}
                    >
                        {strArr[i]}
                    </span>)
                );
            } else {
                console.dir(Children);
                return styles.map((style, i) => React.cloneElement(Children[i], {
                    key: i,
                    style: { ...Children[i].props.style, opacity: style.opacity }
                }));
            }
        } else {
            return null;
        }
    }

    getDefaultStyles = (children: {}[] | string): PlainStyle[] | undefined => {
        if (children) {
            if (typeof children === 'string') {
                return children.toString().split('').map((child) => {
                    return { opacity: 0 };
                });
            } else {
                return children.map((child) => {
                    return { opacity: 0 };
                });
            }
        }

        return undefined;
    }
}