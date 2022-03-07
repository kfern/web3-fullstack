import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

describe("App", () => {
  it("should search pokemons by name", () => {
    const { getByLabelText, queryAllByText, getByRole, queryAllByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = getByRole("button", { name: "Search" });
    userEvent.type(getByLabelText("query-input"), "unknown");
    userEvent.click(button);

    expect(queryAllByText(/searching.*unknown/gi).length).toBe(1);
    expect(queryAllByRole("button", { name: "Search" }).length).toBe(0);
    expect(queryAllByText(/error/gi).length).toBe(0);
  });
});
