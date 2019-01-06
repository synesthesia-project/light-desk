import {extend} from 'lodash';

import * as proto from '../../shared/proto';
import {LabelComponentStyle} from '../types/styles';
import {IDMap} from '../util/id-map';

import {Component} from './base';

const DEFAULT_STYLE: LabelComponentStyle = {
  bold: false
};

/**
 * A simple text component. Could be used to label components in a desk, or for
 * more dynamic purposes such as displaying the status of something.
 *
 * ![](media://images/label_screenshot.png)
 */
export class Label extends Component {

  private readonly style: LabelComponentStyle;
  private text: string;

  public constructor(text: string, style: Partial<LabelComponentStyle> = {}) {
    super();
    this.style = extend({}, DEFAULT_STYLE, style);
    this.text = text;
  }

  public getProtoInfo(idMap: IDMap): proto.Component {
    return {
      component: 'label',
      key: idMap.getId(this),
      style: this.style,
      text: this.text
    };
  }

  public setText(text: string): Label {
    if (text !== this.text) {
      this.text = text;
      this.updateTree();
    }
    return this;
  }
}
