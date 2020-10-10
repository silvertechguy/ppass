import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import App from "./App";
import mockResponse from "./__mocks__/password-supersecretpassword-response.json";
import { endpoint } from "./API";
fetchMock.enableMocks();
const setup = () => {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
};
describe("Header", () => {
  test('"How it works" link points to the correct page', () => {
    setup();
    const link = screen.getByRole("link", { name: /how it works/i });
    userEvent.click(link);
    expect(
      screen.getByRole("heading", { name: /how it works/i })
    ).toBeInTheDocument();
  });
  test('"About" link points to the correct page', () => {
    setup();
    const link = screen.getByRole("link", { name: /about/i });
    userEvent.click(link);
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  });
});
describe("Password Checker form", () => {
  test("loads pwned password counts that are rendered on the page", async () => {
    try {
      fetch.once(JSON.stringify(mockResponse)); // Must be at the very top
      setup();
      const passwordCheckInput = screen.getByLabelText("check /");
      userEvent.type(passwordCheckInput, "supersecretpassword");
      const submitButton = screen.getByRole("button", { name: /check/i });
      userEvent.click(submitButton);
      expect(fetch).toHaveBeenCalledWith(
        `${endpoint}api/v1/ppass?password=supersecretpassword`
      );
      await waitForElementToBeRemoved(() => screen.getByText(/is loading/i));
      const numberOfPwnedPasswordCounts = await screen.findByText(
        /your password was found 65 times... you should probably change your password!/i
      );
      screen.debug(numberOfPwnedPasswordCounts);
      expect(numberOfPwnedPasswordCounts).toBeInTheDocument();
    } catch (error) {
      console.error(error);
    }
  });
});
