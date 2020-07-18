import powerbi from "powerbi-visuals-api";

import { ArrowBuilder } from "./VisualBuilder";

import {Visual as VisualClass} from "../src/visual";


describe("ArrowCard", () => {
    let visualBuilder: ArrowBuilder;
    let dataView: DataView;

    beforeEach(() => {
        visualBuilder = new ArrowBuilder(500, 500);
    });

    it("root DOM element is created", () => {
        expect(visualBuilder.mainElement).toBeInDOM();
    });
});