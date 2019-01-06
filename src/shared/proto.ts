import * as styles from '../backend/types/styles';

interface BaseComponent {
  key: number;
}

export interface GroupComponent extends BaseComponent {
  component: 'group';
  title?: string;
  style: styles.GroupComponentStyle;
  children: Component[];
}

export interface SliderButtonComponent extends BaseComponent {
  component: 'slider_button';
  min: number;
  max: number;
  step: number;
  value: number | null;
}

export interface LabelComponent extends BaseComponent {
  component: 'label';
  style: styles.LabelComponentStyle;
  text: string;
}

export interface ButtonComponent extends BaseComponent {
  component: 'button';
  text: string;
}

export interface SwitchComponent extends BaseComponent {
  component: 'switch';
  state: 'on' | 'off';
}

export type Component = GroupComponent | SliderButtonComponent | LabelComponent | ButtonComponent | SwitchComponent;

export interface UpdateTreeMsg {
  type: 'update_tree';
  root: GroupComponent;
}

export type ServerMessage = UpdateTreeMsg;

export interface BaseClientComponentMessage {
  type: 'component_message';
  componentKey: number;
}

export interface SliderButtonUpdateMessage extends BaseClientComponentMessage {
  component: 'slider_button';
  value: number;
}

export interface ButtonPressMessage extends BaseClientComponentMessage {
  component: 'button';
}

export interface SwitchToggleMessage extends BaseClientComponentMessage {
  component: 'switch';
}

export type ClientComponentMessage = SliderButtonUpdateMessage | ButtonPressMessage | SwitchToggleMessage;

export type ClientMessage = ClientComponentMessage;
