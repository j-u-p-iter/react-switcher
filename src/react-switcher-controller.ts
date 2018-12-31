import * as React from "react";

// we can create input and get react synthetic event object in callback
// but not to complicate we just simulate event object, creating pseudoEvent object
interface IPseudoEvent {
  currentTarget: {
    name?: string;
    value: boolean;
  };
}

interface IChildrenProps {
  api: {
    getOn: SwitcherController["getOn"];
    setOn: SwitcherController["setOn"];
    resetOn: SwitcherController["resetOn"];
    toggleOn: SwitcherController["toggleOn"];
  };
}

export interface ISwitcherProps {
  onChange: (pseudoEvent?: IPseudoEvent) => void;
  children: (childrenProps: IChildrenProps) => React.ReactNode;
  name?: string;
  defaultOn?: boolean;
}

interface IDefaultProps {
  defaultOn: boolean;
  onChange: () => void;
}

type SwitcherWithDefaultProps = ISwitcherProps & IDefaultProps;

interface ISwitcherState {
  on: boolean;
}

export class SwitcherController extends React.Component<
  ISwitcherProps,
  ISwitcherState
> {
  public static defaultProps: IDefaultProps = {
    defaultOn: false,
    onChange: () => {}
  };

  public getProps = () => this.props as SwitcherWithDefaultProps;

  public state: ISwitcherState = {
    on: this.getProps().defaultOn
  };

  // API methods to control Switcher state
  public getOn = (): boolean => this.state.on;

  public setOn = (on: boolean): void => {
    this.setState({ on });
  };

  public resetOn = (): void => {
    this.setState({ on: this.getProps().defaultOn });
  };

  public toggleOn = (): void => {
    const { onChange, name } = this.props;

    this.setState(
      ({ on }) => ({ on: !on }),
      () =>
        onChange({
          currentTarget: {
            name,
            value: this.state.on
          }
        })
    );
  };

  public render() {
    const api = {
      getOn: this.getOn,
      setOn: this.setOn,
      resetOn: this.resetOn,
      toggleOn: this.toggleOn
    };

    return this.props.children({ api });
  }
}
