import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import {hierarchy, select, tree, TreeLayout} from "d3";
import ReactTooltip from "react-tooltip";

import {INode} from "../../core/model/interfaces";
import {ComponentType, NodeType, JunctionType, getContextString, getOperatorString} from "../../core/model/enums";
import {Entry} from "../../core/model/entry";

import "./tree.css";
import {
    componentColorScaler,
    componentStrokeColorScaler,
    negatedStroke,
    nodeColorScaler,
    strokeColorScaler
} from "../../core/config/scales";
import {setActiveNode} from "../../state/documents/actions";

interface IProps {
    currentEntry: Entry,
    setActiveNode: Function,
    showModal: Function,
    useNodeLabels: Boolean
}

const TreeComponent = (props: IProps) => {

    const svgEl = useRef(null); // The SVG HTML element containing the tree graphic

    const {
        currentEntry,
        setActiveNode,
        showModal,
        useNodeLabels
    } = props;

    // The entire procedure to draw the tree graphic is contained here as a side effect.
	useEffect(() => {

	    // Vertical spacing between each level of the tree (pixels)
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
        let margin = { top: 40, bottom: 40 };
        let width: number = containerWidth;

        // Create tree layout and root node
        let treeLayout: TreeLayout<INode> = tree<INode>().size([width, 500]); // height is initially 500
        let root = hierarchy(currentEntry.root, (d: INode) => d.children);
        let treeNodes = treeLayout(root);

        // Set SVG height based on the depth of the tree
        let height: number = (treeNodes.height * levelSpacing) + margin.bottom;

        const svg = select(svgEl.current);
        svg.attr("height", height + margin.top + margin.bottom);
        if(svg.select("g").empty()) {
            svg.append("g")
                .attr("class", "links")
                .attr("transform", "translate(" + 0 + "," + margin.top + ")");
            svg.attr("width", width)
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
            .attr("d", (d: any) => {    // Curves
                return "M" + d.x + "," + d.y
                    + "C" + d.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + d.parent.y;
            })
            .style("stroke-color", "#495057")
            .style("stroke-width", "1")
            // Dashed line to parent for Property nodes that are not functionally dependent on their parent
            .style("stroke-dasharray", (d: any) => {
                if ([NodeType.property, NodeType.propertyjunction].includes(d.data.nodeType)
                    && !d.data.isFunctionallyDependent) {
                    return "4";
                }
            })

        // Node circles
        nodeEnter.append("circle")
            .attr("fill", (d: any) => {
                if (d.data.nodeType === NodeType.component) {
                    return componentColorScaler(d.data.componentType);
                }
                return nodeColorScaler(d.data.nodeType);
            })
            .style("stroke", (d: any) => {
                if (d.data.isNegated) {
                    return negatedStroke;
                }
                if (d.data.nodeType === NodeType.component) {
                    return componentStrokeColorScaler(d.data.componentType);
                }
                return strokeColorScaler(d.data.nodeType);
            })
            .style("stroke-width", (d: any) => {
                if (d.data.isNegated) {
                    return "3px";
                }
            })
            .attr("cursor", "pointer")
            .attr("r", 17)

            // Tooltips when hovering over nodes
            .attr("data-tip", (d: any) => {
                let html: string;
                let textContent: string | undefined;
                switch (d.data.nodeType) {
                    case NodeType.regulativestatement:
                        html = `<strong>${NodeType.regulativestatement}</strong>`;
                        break;
                    case NodeType.constitutivestatement:
                        html = `<strong>${NodeType.constitutivestatement}</strong>`;
                        break;
                    case NodeType.statementjunction: // Same as ComponentJunction
                    case NodeType.componentjunction:
                        html = `<strong>${d.data.nodeType}</strong><br/>` +
                            ((d.data.junctionType && d.data.junctionType !== JunctionType.none) ?
                                `${getOperatorString(d.data.junctionType)}` : `<em>No junction type</em>`) + `<br/>` +
                            ((d.data.text.isSet()) ? `"${d.data.text.getString()}"` : `<em>No text content</em>`);
                        break;
                    case NodeType.propertyjunction:
                        html = `<strong>${NodeType.propertyjunction}</strong><br/>` +
                            ((d.data.junctionType && d.data.junctionType !== JunctionType.none) ?
                                `${getOperatorString(d.data.junctionType)}` : `<em>No junction type</em>`) + `<br/>` +
                            `Functionally dependent: ${d.data.isFunctionallyDependent ? "Yes" : "No"}<br/>` +
                            ((d.data.text.isSet()) ? `"${d.data.text.getString()}"` : `<em>No text content</em>`);
                        break;
                    case NodeType.component:
                        textContent = (d.data.text.isSet()) ? d.data.text.getString() : undefined;
                        html = `<strong>${NodeType.component}</strong><br/>` +
                            `${d.data.componentType}` +
                            (![ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse]
                                .includes(d.data.componentType) ?
                            (textContent ? `<br/>"${textContent}"` : `<br/><em>No text content</em>`) : ``);
                        break;
                    case NodeType.property:
                        textContent = (d.data.text.isSet()) ? d.data.text.getString() : undefined;
                        html = `<strong>${NodeType.property}</strong><br/>` +
                            `Functionally dependent: ${d.data.isFunctionallyDependent ? "Yes" : "No"}<br/>` +
                            (textContent ? `"${textContent}"` : `<em>No text content</em>`);
                        break;
                    default:
                        html = `<em>Missing node type</em>`;
                        break;
                }
                if (typeof d.data.contextType !== "undefined") {
                    html += `<br/>Context type: ${getContextString(Number(d.data.contextType))}`;
                }
                if (d.data.isNegated) {
                    html += `<br/><em style="color:red">Negated</em>`;
                }
                return html;
            })
            .attr("data-html", true)
            .on("click", (d: any) => {  // Function on node click
                setActiveNode(d.data);
                showModal();
            })

        // Label above Statement nodes showing node type
        if (useNodeLabels) {
            nodeEnter.append("text")
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr("data-html", true)
                .attr("pointer-events", "none")
                .attr("dy", "-25")
                .style("color", "#495057")
                .text((d: any) => {
                    if ([NodeType.regulativestatement, NodeType.constitutivestatement].includes(d.data.nodeType)) {
                        return d.data.nodeType;
                    }
                    return "";
                });
        }

        // Label below nodes showing text content
        if (useNodeLabels) {
            // White rectangles behind text content so it doesn't clash with lines
            nodeEnter.append("rect")
                .attr("x", -10)
                .attr("y", 18)
                .attr("width", 20)
                .attr("height", 17)
                .attr("rx", 8)
                .attr("fill", "white")
                .style("display", (d: any) => { // Render only on nodes with text content
                    if ([NodeType.component, NodeType.property, NodeType.statementjunction,
                        NodeType.componentjunction, NodeType.propertyjunction].includes(d.data.nodeType)) {
                        if (d.data.text && d.data.text.isSet()) {
                            return "inherit";
                        }
                        return "none";
                    }
                    return "none";
                })

            // Text content labels
            nodeEnter.append("text")
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr("data-html", true)
                .attr("pointer-events", "none")
                .style('font-style', 'italic')
                .style("color", "#495057")
                .each( function (d: any) {  // Must be explicit function to be able to use `this`, not "() =>"
                    let textContent: string = "";
                    if ([NodeType.component, NodeType.property, NodeType.statementjunction,
                        NodeType.componentjunction, NodeType.propertyjunction].includes(d.data.nodeType)) {
                        textContent = (d.data.text ? d.data.text.getString() : "");
                    }
                    if (textContent) {  // Split text content into word-wrapped lines
                        let regex = new RegExp(".{0,18}(?:\\s|$)","g");
                        let lines = textContent.match(regex);   // Returns an array of suitably sized strings

                        for (let j = 0; j < lines.length - 1; j++) {    // Skip the last element, it's always empty
                            select(this).append("tspan")    // Each line uses a separate <tspan>
                            .attr("dy",() => {
                                if (j === 0) {
                                    return 30;  // Place the first line below the node,
                                }
                                return 15;  // and the rest at a line height of 15px each
                            })
                            .attr("x",0)
                            .text(lines[j]);
                        }
                    }
                });
        }

        // Label on each node showing logical operators and component letters
        nodeEnter.append("text")
            .attr("text-anchor", "middle")
            .attr('alignment-baseline', "middle")
            .style("font-size", "14px")
            .attr("data-html", true)
            .attr("pointer-events", "none")
            .attr("dy", "1")
            .style("color", "#222")
            .html((d: any) => {
                if (d.data.junctionType) {
                    const jtype = d.data.junctionType;
                    if (jtype !== JunctionType.none) {
                        return jtype;
                    } else {
                        return "";
                    }
                }
                if (d.data.componentType && d.data.nodeType !== NodeType.junction) {
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
                        case ComponentType.constitutingproperties:
                            return "P";
                        case ComponentType.modal:
                            return "M";
                        case ComponentType.constitutivefunction:
                            return "F";
                        case ComponentType.constitutedentity:
                            return "E";
                        case ComponentType.orelse:
                            return "O";
                        case ComponentType.simplecontext:
                            return "";
                        default:
                            return "";
                    }
                }
            })

        ReactTooltip.rebuild();

        return () => { // Cleanup
            ReactTooltip.hide();
        };

    }, [svgEl, currentEntry.root, setActiveNode, showModal, useNodeLabels])

    return (
        <div className="treeContainer">
            <svg
                ref={svgEl}
            />
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    useNodeLabels: state.appSettings.preferences.useNodeLabels
});

const mapDispatchToProps = (dispatch: any) => ({
    setActiveNode: (node: INode) => dispatch(setActiveNode(node))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TreeComponent);
