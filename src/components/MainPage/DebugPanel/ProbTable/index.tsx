/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import {
  ShimmeredDetailsList, SelectionMode, DetailsListLayoutMode,
} from 'office-ui-fabric-react';
import './style.scss';

type Props = {
  labels: Array<string>
  aid: string
  io: any
}

type ListColumn = {
  key: string
  name: string
  minWidth: number
  fieldName: string
}

type States = {
  probs: Array<any>
}

export default class CSIGraph extends React.Component<Props, States> {
  private columns: Array<ListColumn>

  constructor(props) {
    super(props);

    this.state = { probs: [] };

    this.columns = [];
    for (let i = 0; i < props.labels.length; i += 1) {
      this.columns.push({
        key: props.labels[i],
        name: props.labels[i],
        fieldName: props.labels[i],
        minWidth: 120,
      });
    }

    props.io.on('debugPred', (buf) => {
      const data = JSON.parse(buf.toString());
      if (data.aid === props.aid) {
        const newProbs = [];
        for (let i = 0; i < data.data.length; i += 1) {
          const partialData = {};
          for (let j = 0; j < props.labels.length; j += 1) {
            partialData[props.labels[j]] = data.data[i][j];
          }
          newProbs.push(partialData);
        }
        const { probs } = this.state;
        this.setState({ probs: [...probs, ...newProbs] });
      }
    });
  }

  render() {
    const { probs } = this.state;

    const probList = (
      <ShimmeredDetailsList
        compact
        items={probs}
        columns={this.columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        enableShimmer={probs.length === 0}
        onRenderItemColumn={colorColumn}
        onDidUpdate={scrollDown}
        enableUpdateAnimations
        data-is-scrollable="true"
      />
    );

    return (
      <div styleName="probSection">
        {probList}
      </div>
    );
  }
}

const colorColumn = (item, index: number, column: ListColumn) => {
  const prob = Number(item[column.fieldName]);

  return (<span className={`prob-cell prob-${Math.floor(prob * 20)}`}>{prob.toFixed(10)}</span>);
};

const scrollDown = () => {
  const content = document.querySelector('.ms-DetailsList-contentWrapper');
  content.scrollTo(0, content.scrollHeight);
};
