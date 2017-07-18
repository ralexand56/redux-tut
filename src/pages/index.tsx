import * as React from 'react';

export default () => {
    return (
        <div>
            <h2>The Three Principles of Redux</h2>
            <div style={{ borderLeft: '5px solid lavender', fontSize: '1.5em' }}>
                <ul>
                    <li>
                        <span>
                            <b>
                                Single source of truth:
                            </b>
                            The state of your whole application is stored in an object tree within a single store.
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>
                                State is read-only:
                            </b>
                            The only way to change the state is to emit an action, an object describing what happened.
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>
                                Changes are made with pure functions:
                            </b>
                            To specify how the state tree is transformed by actions, you write pure reducers.
                        </span>
                    </li>
                </ul>
            </div>
            <h1>Lies!!!</h1>
            <img src="./images/createStore.png" alt=""/>
        </div>
    );
};

export const  Lie = () => {
    return (
        <h1>LIES!!!</h1>
    );
} ;