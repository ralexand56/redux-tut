import * as React from 'react';

const getItem = (str: string, obj: {}) => <div className="active">Rico</div>;

const product = {
    name: '3/1 FIX',
}; 

/*?*/
const x = getItem('name', product);

// tslint:disable-next-line:no-unused-expression
x;