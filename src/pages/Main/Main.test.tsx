import React from "react";
import { fireEvent, cleanup } from "@testing-library/react";
import Main from "./Main";
import { getNock, renderWithRouter } from "../../testUtils";
import { Switch, Route } from "react-router-dom";

const username = "johndoe";

afterEach(cleanup);

test("fills out the search input and loads data succesfully", async () => {
  getNock()
    .get(`/users/${username}/repos`)
    .reply(200, [{ id: 1, name: "My repo", stargazers: 10 }]);

  getNock()
    .get(`/users/${username}/orgs`)
    .reply(200, [{ id: 1, login: "My org" }]);

  const view = renderWithRouter(
    <Switch>
      <Route exact path={["/", "/:username"]} component={Main} />
    </Switch>
  );

  const input = view.getByPlaceholderText("Enter username") as HTMLInputElement;
  const button = view.getByTestId("search-submit");

  fireEvent.change(input, { target: { value: username } });
  fireEvent.click(button);

  expect(input.value).toBe(username);

  const repoTitle = await view.findByText("My repo");
  const orgTitle = await view.findByText("My org");

  expect(repoTitle).toBeTruthy();
  expect(orgTitle).toBeTruthy();
});

test("shows no data", async () => {
  getNock().get(`/users/${username}/repos`).reply(200, []);
  getNock().get(`/users/${username}/orgs`).reply(200, []);

  const view = renderWithRouter(
    <Switch>
      <Route exact path={["/", "/:username"]} component={Main} />
    </Switch>,
    { route: `/${username}` }
  );

  const repoMessage = await view.findByText("User has no repositories");
  const orgMessage = await view.findByText("User has no organizations");

  expect(repoMessage).toBeTruthy();
  expect(orgMessage).toBeTruthy();
});

test("user not found", async () => {
  const response = {
    message: "Not Found",
    documentation_url:
      "https://docs.github.com/rest/reference/orgs#list-organizations-for-a-user",
  };

  getNock().get(`/users/${username}/repos`).reply(404, response);
  getNock().get(`/users/${username}/orgs`).reply(404, response);

  const view = renderWithRouter(
    <Switch>
      <Route exact path={["/", "/:username"]} component={Main} />
    </Switch>,
    { route: `/${username}` }
  );

  const message = await view.findByText("User not found");

  expect(message).toBeTruthy();
});
