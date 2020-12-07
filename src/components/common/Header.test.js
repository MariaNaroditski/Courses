import React from "react";
import Header from "./Header";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

it("contains 3 anchor via mount", () => {
  const numAnchor = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchor).toEqual(3);
});
