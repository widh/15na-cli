/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

import React from 'react';
import { Text, Dropdown } from 'office-ui-fabric-react';

import CSIGraph from './CSIGraph';
import ProbTable from './ProbTable';
import './style.scss';

type Area = {
  aid: string
  name: string
}

interface Props {
  areas: Array<Area>
  tx: Array<number>
  rx: Array<number>
  dataInterval: number
  labels: Array<string>
  targetLabelIndex: number
  io: any
  procAmp: boolean
  procPhase: boolean
}

type States = {
  currentArea: Area
  txCol: number
  rxCol: number
  timer: number
}

type DropdownOption = {
  key: string,
  text: string,
}

export default class DebugPanel extends React.Component<Props, States> {
  private areaOptions: Array<DropdownOption>

  private registeredGraphs: Object

  constructor(props) {
    super(props);

    const { areas } = props;
    this.state = {
      // If areas.length === 0, the client will not be registered.
      // This is checked in server-side.
      currentArea: areas[0],
      txCol: (props.procAmp + props.procPhase) * (props.rx.length) * 30,
      rxCol: (props.procAmp + props.procPhase) * 30,
      timer: 0,
    };

    // Create dropdown area option list
    this.areaOptions = [];
    for (let i = 0; i < areas.length; i += 1) {
      this.areaOptions.push({
        key: areas[i].aid,
        text: areas[i].name,
      });
    }

    this.changeArea = this.changeArea.bind(this);
    this.registerGraph = this.registerGraph.bind(this);

    this.registeredGraphs = {};
    props.io.on('debugCSI', (buf) => {
      const data = JSON.parse(buf.toString());
      const {
        currentArea, txCol, rxCol, timer,
      } = this.state;
      const {
        tx, rx, procAmp, procPhase,
      } = this.props;
      if (data.aid === currentArea.aid) {
        for (let t = 0; t < tx.length; t += 1) {
          for (let r = 0; r < rx.length; r += 1) {
            const startPoint = (tx[t] - 1) * txCol + (rx[r] - 1) * rxCol;
            if (procAmp && this.registeredGraphs[graphHash(tx[t], rx[r], 'amplitude')]) {
              this.registeredGraphs[graphHash(tx[t], rx[r], 'amplitude')](
                data.data.map((pkt, i) => ({
                  Time: 0.1 * (timer + i),
                  ...pkt.slice(startPoint, startPoint + 30),
                })),
              );
            }
            if (procPhase && this.registeredGraphs[graphHash(tx[t], rx[r], 'phase')]) {
              this.registeredGraphs[graphHash(tx[t], rx[r], 'phase')](
                data.data.map((pkt, i) => ({
                  Time: 0.1 * (timer + i),
                  ...pkt.slice(startPoint + 30, startPoint + 60),
                })),
              );
            }
          }
        }
        this.setState({ timer: timer + data.data.length });
      }
    });
  }

  registerGraph(tx, rx, type, updateData) {
    this.registeredGraphs[graphHash(tx, rx, type)] = updateData;
  }

  changeArea(option, selection) {
    this.setState({
      currentArea: {
        aid: selection.key,
        name: selection.text,
      },
    });
  }

  render() {
    const {
      labels, io, tx, rx, procAmp, procPhase,
    } = this.props;
    const { currentArea } = this.state;

    const trxPairGraphDOM = [];
    for (let t = 0; t < tx.length; t += 1) {
      for (let r = 0; r < rx.length; r += 1) {
        if (procAmp) {
          trxPairGraphDOM.push(
            <CSIGraph
              key={`irona-csi-${tx[t]}-${rx[r]}`}
              txNo={tx[t]}
              rxNo={rx[r]}
              type="amplitude"
              registerGraph={this.registerGraph}
            />,
          );
        }
        if (procPhase) {
          trxPairGraphDOM.push(
            <CSIGraph
              key={`irona-csi-${tx[t]}-${rx[r]}`}
              txNo={tx[t]}
              rxNo={rx[r]}
              type="phase"
              registerGraph={this.registerGraph}
            />,
          );
        }
      }
    }

    return (
      <div styleName="debugPanel">
        <div styleName="debugPanelWrapper">
          <div styleName="areaSelectionContainer">
            <Text styleName="areaSelectionGuide">You are now watching </Text>
            <Dropdown
              selectedKey={currentArea.aid}
              options={this.areaOptions}
              style={{
                display: 'inline-block',
              }}
              onChange={this.changeArea}
            />
          </div>
          <div styleName="areaAnalysisContainer">
            <div styleName="areaCSIContainer">
              {trxPairGraphDOM}
            </div>
            <div styleName="areaDivider">&nbsp;</div>
            <div styleName="areaPredContainer">
              <ProbTable labels={labels} io={io} aid={currentArea.aid} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const graphHash = (tx, rx, type) => `${tx}-${rx}-${type}`;
