/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
import * as d3 from "d3";

import {Arrow} from "./Model/Arrow";

type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
    
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private arrowElement: Selection<SVGElement>;
    private  arrow: Arrow;
    private visualSettings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('ArrowCard', true)
            .attr('id','ArrowCardSVG');
        this.container = this.svg.append("g")
            .classed('container', true);
        this.arrowElement = this.container.append("polygon")
            .classed('arrow', true);

        this.arrow = new Arrow();
    }

    public update(options: VisualUpdateOptions) {
        let dataView: DataView = options.dataViews[0];
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);

        this.visualSettings = VisualSettings.parse<VisualSettings>(dataView);

        this.visualSettings.arrow.arrowThickness = Math.max(0, this.visualSettings.arrow.arrowThickness);
        this.visualSettings.arrow.arrowThickness = Math.min(20, this.visualSettings.arrow.arrowThickness);

        this.arrow.configArrow(20,width,height);
        this.arrow.setDirection(this.visualSettings.arrow.arrowOrientation);
        this.arrow.setValue(<number>dataView.single.value);
        this.arrow.setColor(this.visualSettings.arrow.arrowColor);
        this.arrow.setBorderColor(this.visualSettings.arrow.arrowBorderColor);
        this.arrow.setThickness(this.visualSettings.arrow.arrowThickness);  

        this.arrowElement.attr("points", this.arrow.getArrowPoints())
            .style("fill", this.arrow.getColor())
            .style("stroke", this.arrow.getBorderColor())
            .style("stroke-width", this.arrow.getThickness());

    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        return VisualSettings.enumerateObjectInstances(settings, options);
    }
}