/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import { Text } from 'office-ui-fabric-react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import './style.scss';

type Props = {
  txNo: number
  rxNo: number
  type: 'amplitude' | 'phase'
  registerGraph: any
}

type States = {
  CSI: Array<any>
}

export default class CSIGraph extends React.Component<Props, States> {
  constructor(props) {
    super(props);

    this.state = { CSI: [] };

    this.updateGraph = this.updateGraph.bind(this);

    const { registerGraph } = props;
    registerGraph(props.txNo, props.rxNo, props.type, this.updateGraph);
  }

  updateGraph(newData) {
    const { CSI } = this.state;
    const newCSI = [...CSI, ...newData];
    this.setState({ CSI: newCSI.slice(Math.max(newCSI.length - 100, 0), newCSI.length) });
  }

  render() {
    const {
      txNo, rxNo, type,
    } = this.props;
    const { CSI } = this.state;
    const CSITimeMax = CSI.length > 0 ? Math.max(CSI[CSI.length - 1].Time + 1, 10) : 10;

    const lines = [];
    for (let i = 0; i < 30; i += 1) {
      lines.push(
        <Line
          type="monotone"
          dot={false}
          activeDot={false}
          dataKey={i}
          stroke={colors[i]}
          key={`${txNo}-${rxNo}-${type}-${i}`}
          isAnimationActive={false}
        />,
      );
    }

    return (
      <div styleName="csiSection">
        <Text
          styleName="trxPairLabel"
          variant="medium"
        >
          {`Tx ${txNo} ↔ Rx ${rxNo}, ${type === 'phase' ? 'Phase' : 'Amplitude'}`}
        </Text>
        <LineChart
          width={460}
          height={240}
          data={CSI}
        >
          <CartesianGrid stroke="var(--over-color)" strokeDashArray="5 5" />
          <XAxis
            dataKey="Time"
            domain={[Math.max(0, CSITimeMax - 10), CSITimeMax]}
            type="number"
            name="Time"
            unit="sec"
          />
          <YAxis
            allowDataOverflow
            domain={type === 'phase' ? [-15, 15] : [0, 30]}
            type="number"
            name={type === 'phase' ? 'Phase Shift' : 'Amplitude Degradation'}
            scale="linear"
            unit={type === 'phase' ? 'rad' : 'dB'}
          />
          {lines}
        </LineChart>
      </div>
    );
  }
}

const colors = [
  '#fddd0f',
  '#f7b312',
  '#fba919',
  '#fc9f29',
  '#fd9426',
  '#f67e2a',
  '#e65a26',
  '#e25b3b',
  '#e9604e',
  '#e14552',
  '#e34f83',
  '#c8206c',
  '#95295d',
  '#5d1b58',
  '#4d0f52',
  '#461a59',
  '#453977',
  '#3e4a7e',
  '#426c94',
  '#537785',
  '#537364',
  '#567865',
  '#648c57',
  '#61945a',
  '#699d4b',
  '#68ac3b',
  '#6fac23',
  '#99ba15',
  '#d1cf09',
  '#e7d302',
];
