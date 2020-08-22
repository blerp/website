jest.mock("next/dynamic", () => () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = "LoadableComponent";
    DynamicComponent.preload = jest.fn();
    return DynamicComponent;
});

import * as React from "react";
import { render } from "@testing-library/react";

describe("Pages", () => {
    describe("Index", () => {
        it("sanity check", () => {
            expect(1 + 1).toBe(2);
        });
    });
});
