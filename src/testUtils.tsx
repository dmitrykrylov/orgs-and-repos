import React from "react";
import { Scope } from "nock/types";
import nock from "nock";
import { API_BASE_URL } from "./constants";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { render } from "@testing-library/react";

const allowedHeaders = ["Authorization"];
const nockHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": allowedHeaders.join(","),
};

export const getNock = (): Scope =>
  nock(API_BASE_URL as string)
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
    })
    .intercept(/.*/, "OPTIONS")
    .reply(200, undefined, nockHeaders)
    .defaultReplyHeaders(nockHeaders);

interface Parameters {
  route?: string;
  history?: MemoryHistory;
}

export const renderWithRouter = (
  ui: React.ReactNode,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: Parameters = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};
