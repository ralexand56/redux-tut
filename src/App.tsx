import * as React from 'react';
import Redux from 'react-redux';
import Staggered from './Staggered';
import './App.css';
import Iconic from './Iconic';
import {Motion, spring, presets} from 'react-motion';
import StretchPanel from './StretchPanel';

export const getStringValue = (prop : string, obj : {}) : string => obj[prop];
export const nameContains = (prop : string, val : string, list : {}[]) => list.filter(x => getStringValue(prop, x).includes(val));

export const nameStartsWith = (prop : string, val : string, list : {}[]) => list.filter(x => getStringValue(prop, x).startsWith(val));

export const topicStartsWith = (val : string, list : {}[]) => nameStartsWith('title', val, list);
// export const  notActive = (list: {}) => compose

interface State {
  activeTopicID : number;
  alternate : boolean;
  isOpen : boolean;
  max : number;
}

interface Topic {
  id : number;
  title : string;
  description?: string;
  code?: string;
  pages?: JSX.Element[];
  isVisible?: boolean;
  isActive?: boolean;
}

export type KnownAction = |IncrementAction | DecrementAction | NextPageAction | PreviousPageAction;

export interface IncrementAction {
  type : 'INCREMENT';
}
export interface DecrementAction {
  type : 'DECREMENT';
}

export interface NextPageAction {
  type : 'NEXT_PAGE';
}
export interface PreviousPageAction {
  type : 'PREVIOUS_PAGE';
}

const topicArr = [
  {
    title: 'Hello the'
  }, {
    title: 'The Big Hurt'
  }, {
    title: 'The Loser'
  }
];

const topics : {
  [id : number] : Topic;
} = {
  1: {
    id: 1,
    title: 'The Rise and Fall and Rise Again of Functional Programming'
  },
  2: {
    id: 2,
    title: 'The Importance of Immutability'
  },
  3: {
    id: 3,
    title: 'Redux: The Ultimate State Management Machine',
    pages: []
  },
  4: {
    id: 4,
    title: 'The React Redux Connection'
  },
  5: {
    id: 5,
    title: 'React Redux Best Practices'
  }
};/*? topics.length */

export const insts = [
  {
    id: 1,
    name: 'Bank of America',
    Regions: [
      {
        statecode: 'CA',
        name: 'California',
        products: [
          {
            prodid: 1,
            name: '3/1 ARM'
          }, {
            prodid: 1,
            name: '5/1 ARM'
          }
        ]
      }, {
        statecode: 'NY',
        name: 'New York',
        products: [
          {
            prodid: 1,
            name: '3/1 ARM'
          }, {
            prodid: 1,
            name: '5/1 ARM'
          }
        ]
      }
    ]
  }, {
    id: 2,
    name: 'Citibank',
    Regions: []
  }, {
    id: 3,
    name: 'Regions',
    Regions: []
  }
];

interface TreeMeta {
  id : string;
  nameField : string;
  arrayField : string;
}

export const treeMetas : TreeMeta[] = [
  {
    id: 'id',
    nameField: 'name',
    arrayField: ''
  }, {
    id: 'statecode',
    nameField: 'name',
    arrayField: 'Regions'
  }
];

export const renderTree = (root : {}[], meta : TreeMeta[]) => {
  const data : {}[] = [];

  meta.map((tm : TreeMeta, ind : number) => (ind === 0)
    ? renderTreeLevel(root, tm, data, ind)
    : renderTreeLevel(root[0][tm.arrayField], tm, data, ind));

  return data;
};

export const renderTreeLevel = (arr : {}[], {id, nameField, arrayField} : TreeMeta, data : {}[], level : number) => {
  let currlevel = null;
  let renderChildren = false;

  // (currlevel !== level) ? data.push(<select />) : renderChildren = true;

  return (
    <select>
      {arr.map(a => data.push(
        <h2 key={a[id]}>{a[nameField]}</h2>
      ));
}
    </select>
  );
};

export default class App extends React.Component < {},
State > {
  store: Redux.Store < State >;

  constructor() {
    super();

    this.state = {
      activeTopicID: 1,
      alternate: true,
      isOpen: true,
      max: 12
    };
  }

  handleKeyUp = (e : KeyboardEvent) => {
    if (e.keyCode === 39 && this.state.activeTopicID < this.state.max) {
      this
        .store
        .dispatch({type: 'INCREMENT'});
    }

    if (e.keyCode === 37 && this.state.activeTopicID > 1) {
      this
        .store
        .dispatch({type: 'DECREMENT'});
    }
  }

  componentWillMount() {
    window.addEventListener('keyup', this.handleKeyUp,);
  }

  render() {
    let activeTopic = topics[this.state.activeTopicID];

    return (
      <div className="App">
        <Motion
          key={activeTopic.id}
          defaultStyle={{
          height: 30,
          opacity: 0
        }}
          style={{
          height: spring(0, presets.wobbly,),
          opacity: spring(1.0)
        }}>
          {value => <h1
            style={{
            opacity: value.opacity,
            transform: `translateY(${value.height}px)`,
            overflow: 'hidden'
          }}>
            <Staggered textSize={1}>
              {`${activeTopic.id}. ${activeTopic.title}`}
            </Staggered>
          </h1>}
        </Motion>
        {activeTopic.pages && activeTopic.pages[0]}
        <StretchPanel title="Home" isExpanded={false}>
          <Iconic text="ME"/>
        </StretchPanel>
        <h4>
          {JSON.stringify(topicArr.filter(({title}) => /The/.test(title)))}
        </h4>
        <h4>
          {JSON.stringify(topicStartsWith('The', topicArr))}</h4>
        <h4>
          {JSON.stringify(topics[1])}</h4>

        {// console.dir(insts[0]['Regions'])
        renderTree(insts, treeMetas)}
      </div>
    );
  }

  pager = (state : State, action : KnownAction,) => {
    if (typeof state === 'undefined') {
      return {activeTopicID: 1, max: 5, currPageNo: 0, topics: topics};
    }
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state,
          activeTopicID: state.activeTopicID + 1
        };
      case 'DECREMENT':
        return {
          ...state,
          activeTopicID: state.activeTopicID - 1
        };
      default:
        return state;
    }
  }
}
