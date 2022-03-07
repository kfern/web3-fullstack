import searchReducer, { initialState, setStatus } from "./slice";
import { LocalShow, SetStatusPayload, LocalStatus } from "./types";

describe("search reducer", () => {
  it("should handle initial state", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toStrictEqual(initialState);
  });

  describe("setStatus", () => {
    it("idle", () => {
      const params: SetStatusPayload = {
        status: LocalStatus.IDLE,
      };
      const act = searchReducer(initialState, setStatus(params));

      const expected: LocalShow = {
        input: false,
        search: false,
        error: false,
      };
      expect(act.show).toStrictEqual(expected);
    });

    it("search.init", () => {
      const params: SetStatusPayload = {
        status: LocalStatus.SEARCH_INIT,
      };
      const act = searchReducer(initialState, setStatus(params));

      const expected: LocalShow = {
        input: true,
        search: false,
        error: false,
      };
      expect(act.show).toStrictEqual(expected);
    });

    it("search.submit", () => {
      const initParams: SetStatusPayload = {
        status: LocalStatus.SEARCH_INIT,
      };
      const searchInitState = searchReducer(initialState, setStatus(initParams));

      const submitParams: SetStatusPayload = {
        status: LocalStatus.SEARCH_SUBMIT,
        params: { query: "TEXT" },
      };
      const act = searchReducer(searchInitState, setStatus(submitParams));

      const expected: LocalShow = {
        input: false,
        search: true,
        error: false,
      };
      expect(act.show).toStrictEqual(expected);
      expect(act.input).toStrictEqual(submitParams.params.query);
    });

    it("search.error", () => {
      const initParams: SetStatusPayload = {
        status: LocalStatus.SEARCH_INIT,
      };
      const searchInitState = searchReducer(initialState, setStatus(initParams));

      const fakeError: SetStatusPayload = {
        status: LocalStatus.SEARCH_ERROR,
        params: {
          error: {
            status: "PARSING_ERROR",
            originalStatus: 404,
            data: "Not Found",
            error: "SyntaxError: Unexpected token N in JSON at position 0",
          },
        },
      };
      const act = searchReducer(searchInitState, setStatus(fakeError));

      const expected: LocalShow = {
        input: true,
        search: false,
        error: true,
      };
      expect(act.show).toStrictEqual(expected);
      expect(act.error.includes("Not Found")).toBe(true);
    });
  });
});
