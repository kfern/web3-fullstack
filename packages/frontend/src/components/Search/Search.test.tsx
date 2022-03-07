import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Search from "./Search";

describe("Search components", () => {
  it("a text is required before search", () => {
    const { queryAllByText, getByRole, queryAllByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    // We can't click on the button because it should be disabled
    const button = getByRole("button", { name: "Search" });
    userEvent.click(button);

    expect(queryAllByText(/searching/gi).length).toBe(0);
    expect(queryAllByRole("button", { name: "Search" }).length).toBe(1);
    expect(queryAllByText(/error/gi).length).toBe(0);
  });

  it("should search by text", async () => {
    const testQuery = "Pikachu";

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const searchButton = screen.getByRole("button", { name: "Search" });
    userEvent.type(screen.getByLabelText("query-input"), testQuery);
    userEvent.click(searchButton);

    // Loading
    expect(screen.queryAllByRole("button", { name: "Search" }).length).toBe(0);
    const loadingState = screen.getByText(new RegExp(`searching.*${testQuery}`, "ig"));
    expect(loadingState).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingState);

    // Success
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: testQuery.toLowerCase() })).toBeInTheDocument();
      expect(screen.getByAltText(new RegExp(testQuery.toLowerCase()))).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "New search" })).toBeInTheDocument();
      expect(screen.queryAllByText(/error/gi).length).toBe(0);
    });

    // New search
    const newSearchButton = screen.getByRole("button", { name: "New search" });
    userEvent.click(newSearchButton);
    expect(screen.queryAllByRole("button", { name: "Search" }).length).toBe(1);
    expect(screen.getByLabelText("query-input")).toBeInTheDocument();
  });

  it("should show an error when query fails", async () => {
    const testQuery = "unknown";

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const button = screen.getByRole("button", { name: "Search" });
    userEvent.type(screen.getByLabelText("query-input"), testQuery);
    userEvent.click(button);

    // Loading
    expect(screen.queryAllByRole("button", { name: "Search" }).length).toBe(0);
    const loadingState = screen.getByText(new RegExp(`searching.*${testQuery}`, "ig"));
    expect(loadingState).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingState);

    // Error
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`error.*${testQuery}.*not found`, "ig"))).toBeInTheDocument()
    );
    expect(screen.getByLabelText("query-input")).toBeInTheDocument();
    expect(screen.queryAllByRole("button", { name: "Search" }).length).toBe(1);
    expect(screen.getAllByRole("button").length).toBe(1);
  });
});
