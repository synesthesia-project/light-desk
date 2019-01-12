import {extend} from 'lodash';

import * as proto from '../../shared/proto';
import { Color, COLOR_RGB_WHITE} from '../util/color';
import {IDMap} from '../util/id-map';

import {Component} from './base';

/**
 * A simple text component. Could be used to label components in a desk, or for
 * more dynamic purposes such as displaying the status of something.
 *
 * ![](media://images/label_screenshot.png)
 */
export class Rect extends Component {

  /** @hidden */
  private color: Color;

  public constructor(color: Color = COLOR_RGB_WHITE) {
    super();
    this.color = color;
  }

  /** @hidden */
  public getProtoInfo(idMap: IDMap): proto.Component {
    return {
      component: 'rect',
      key: idMap.getId(this),
      color: this.color.json()
    };
  }

  public setColor(color: Color): Rect {
    if (!this.color.equals(color)) {
      this.color = color;
      this.updateTree();
    }
    return this;
  }
}
