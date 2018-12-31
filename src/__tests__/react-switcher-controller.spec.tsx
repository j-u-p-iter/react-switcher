import * as React from "react";
import { fireEvent, render } from "react-testing-library";

import { SwitcherController } from "../.";

describe("SwitcherController", () => {
  let getByText: any;
  let onChangeMock: any;
  let getOn: any;

  beforeAll(() => {
    onChangeMock = jest.fn();

    const Switcher = () => (
      <SwitcherController onChange={onChangeMock} name="switcher-name">
        {({ api }) => {
          getOn = api.getOn;

          return (
            <>
              <button onClick={() => api.setOn(true)}>Set On</button>
              <button onClick={() => api.resetOn()}>Reset On</button>
              <button onClick={() => api.toggleOn()}>Toggle On</button>
            </>
          );
        }}
      </SwitcherController>
    );

    ({ getByText } = render(<Switcher />));
  });

  it("exposes correct API", () => {
    expect(getOn()).toBe(false);

    // sets state properly with setOn method
    const setOnButton = getByText("Set On");

    fireEvent.click(setOnButton);

    expect(getOn()).toBe(true);

    // resets state properly with resetOn method
    const resetOnButton = getByText("Reset On");

    fireEvent.click(resetOnButton);

    expect(getOn()).toBe(false);

    // toggls state properly with toggleOn method
    const toggleOnButton = getByText("Toggle On");

    fireEvent.click(toggleOnButton);

    expect(getOn()).toBe(true);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({
      currentTarget: {
        name: "switcher-name",
        value: true
      }
    });

    fireEvent.click(toggleOnButton);

    expect(getOn()).toBe(false);
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    expect(onChangeMock).toHaveBeenCalledWith({
      currentTarget: {
        name: "switcher-name",
        value: false
      }
    });
  });
});
