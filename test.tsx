import * as React from 'react';

const getItem = (str: string, obj: {}) => <div className="active">Rico</div>;

const product = {
    name: '3/1 FIX',
};  /*? $.name */

/*?*/
const x = getItem('name', product).props;

// tslint:disable-next-line:no-unused-expression
x;