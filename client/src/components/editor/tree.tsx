import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { select, tree, hierarchy, TreeLayout } from "d3";
import ReactTooltip from "react-tooltip";

import { INode } from "../../core/model/interfaces";
import { NodeType, ComponentType } from "../../core/model/enums";
import { Entry } from "../../core/model/entry";

import "./tree.css";
import { nodeColorScaler, strokeColorScaler } from "../../core/config/scales";
import { preSetActiveNode } from "../../state/documents/actions";

interface IProps {
    currentEntry: Entry,
    preSetActiveNode?: Function,
    togglefunc: Function
}

const TreeComponent = (props: IProps) => {

    const svgEl = useRef(null); // The SVG HTML element containing the tree graphic

    const {
        currentEntry,
        preSetActiveNode,
        togglefunc
    } = props;

    // The entire procedure to draw the tree graphic is contained here as a side effect that runs once.
	useEffect(() => {

	    // The vertical spacing between each level of the tree
	    const levelSpacing: number = 120;

	    // Calculate the width of the SVG element based on Bootstrap breakpoints
	    let containerWidth: number;
	    if (window.innerWidth <= 576) {         // breakpoint xs
            containerWidth = 400;
        } else if (window.innerWidth <= 768) {  // breakpoint s
            containerWidth = 488;
        } else if (window.innerWidth <= 992) {  // breakpoint m
            containerWidth = 679;
        } else if (window.innerWidth <= 1100) { // custom breakpoint
	        containerWidth = 792;
        } else if (window.innerWidth <= 1200) { // breakpoint l
            containerWidth = 892;
        } else if (window.innerWidth <= 1400) { // breakpoint xl
	        containerWidth = 792;
        } else if (window.innerWidth <= 1600) { // breakpoint xxl
            containerWidth = 992;
        } else {                                // anything above 1600
	        containerWidth = 1511;
        }

	    // Set dimensions for the SVG element
        let margin = { top: 40, bottom: 20 };
        let width: number = containerWidth;

        // Create tree layout and root node
        let treeLayout: TreeLayout<INode> = tree<INode>().size([width, 500]); // height is default 500
        let root = hierarchy(currentEntry.root, (d: INode) => d.children);
        let treeNodes = treeLayout(root);

        // Set SVG height based on the depth of the tree
        let height: number = (treeNodes.height) * levelSpacing + margin.bottom;

        const svg = select(svgEl.current);
        if(svg.select("g").empty()) {
            svg.append("g")
                .attr("class", "links")
                .attr("transform", "translate(" + 0 + "," + margin.top + ")");
            svg.attr("width", width)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("class", "nodes")
                .attr("transform", "translate(" + 0 + "," + margin.top + ")");
        }
        select(svgEl.current).selectAll("g.node").remove();
        select(svgEl.current).selectAll("path.link").remove();

        // Filter out dummy nodes
        let nodes = treeNodes.descendants().filter((node: any) => typeof node.data.nodeType !== "undefined");
        let links = treeNodes.descendants().filter((node: any) => typeof node.data.nodeType !== "undefined").slice(1);
        // Set vertical spacing between levels of the tree
        nodes.forEach((d) => d.y = d.depth * levelSpacing);

        let allNodes = select(svgEl.current).select("g.nodes").selectAll("g.node")
            .data(nodes, (d: any) => d.id);

        // Give each node ID and position
        let nodeEnter = allNodes.enter().append("g");
        nodeEnter.attr("class", "node")
            .attr("id", (d: any) => `node-${d.data.id}`)
            .attr("transform", (d: any) => {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Links (edges between nodes)
        select(svgEl.current).select("g.links").selectAll("g.link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", (d: any) => {
                return "M" + d.x + "," + d.y
                    + "C" + d.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + d.parent.y;
            })
            .style("stroke-width", "1")
        //.style('opacity', .8);

        nodeEnter.append("circle")
            // Graphical circles for nodes
            .attr("fill", (d: any) => {
                return nodeColorScaler(d.data.nodeType);
            })
            .style("stroke", (d: any) => {
                return strokeColorScaler(d.data.nodeType);
            })
            .attr("cursor", "pointer")
            .attr("r", 16)
            // Tooltips
            .attr("data-tip", (d: any) => {
                let html: string;
                switch (d.data.nodeType) {
                    case NodeType.regulativestatement:
                        html = `<strong>Regulative Statement</strong><br/>`;
                        break;
                    case NodeType.constitutivestatement:
                        html = `<strong>Constitutive statement</strong><br/>` +
                            ((d.data.text) ? `"${d.data.text.getString()}"` : `<em>No text content</em>`);
                        break;
                    case NodeType.junction:
                        html = `<strong>Junction</strong><br/>` +
                            ((d.data.junctionType) ? `${d.data.getOperatorString()}` : `<em>No operator</em>`) + `<br/>` +
                            ((d.data.text) ? `"${d.data.text.getString()}"` : `<em>No text content</em>`);
                        break;
                    case NodeType.component:
                        let comp = (d.data.text) ? d.data.text.getString() : undefined;
                        html = `<strong>Component</strong><br/>Type: ${d.data.componentType.toString()}<br/>` +
                            (comp ? `"${comp}"` : `<em>No text content</em>`);
                        break;
                    default:
                        html = `<em>Missing type</em>`;
                        break;
                }
                return html;
            })
            .attr("data-html", true)
            .on("click", (d: any) => {
                // This is the function called on node click, opening that node's modal.
                // (It does so by setting the activeNode branch in Redux state, which the Edit component responds to.)
                preSetActiveNode({ node: d, togglefunc: togglefunc });
            })

        // Label above each node showing node type
        nodeEnter.append("text")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr("data-html", true)
            .attr("pointer-events", "none")
            .attr("dy", "-24")
            .text((d: any) => d.data.nodeType);

        // Labels on nodes showing logical operators and ABDICO components
        nodeEnter.append("text")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', () => 16 * .75 + 'px')
            .attr("data-html", true)
            .attr("pointer-events", "none")
            .attr("dy", "1")
            .html((d: any) => {
                if (d.data.junctionType) {
                    return d.data.junctionType;
                } else if (d.data.componentType) {
                    switch (d.data.componentType) {
                        case ComponentType.attribute:
                            return "A";
                        case ComponentType.directobject:
                            return "Bdir";
                        case ComponentType.indirectobject:
                            return "Bind";
                        case ComponentType.deontic:
                            return "D"
                        case ComponentType.aim:
                            return "I";
                        case ComponentType.activationconditions:
                            return "Cac";
                        case ComponentType.executionconstraints:
                            return "Cex";
                    }
                }
            })

        ReactTooltip.rebuild();

    }, [preSetActiveNode, togglefunc, currentEntry.root, svgEl])

    return (
        <div className="treeContainer">
            <svg
                ref={svgEl}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    preSetActiveNode: (node: INode) => dispatch(preSetActiveNode(node))
});

export default connect(
    null,
    mapDispatchToProps
)(TreeComponent);
