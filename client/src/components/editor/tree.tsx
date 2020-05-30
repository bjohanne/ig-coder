import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { select, tree, hierarchy, TreeLayout } from "d3";
import { INode, IDocument } from "../../core/model/interfaces";
import { Modal } from 'reactstrap';
import { preSetActiveNode } from "../../state/actions";
import "./tree.css";
import Edit from "./edit";
import { NodeType, ComponentType } from "../../core/model/enums";
import { Component } from "../../core/model/component";
import ReactTooltip from "react-tooltip";
import { nodeColorScaler, strokeColorScaler } from "../../core/config/scales";

interface Proptype {
    node: INode,
    currentDocument: IDocument,
    preSetActiveNode?: Function
}

const TreeComponent = (props: Proptype) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let svgNode: any;
    // let diagonal: any;
    let height: number;
    let width: number;
    let treeLayout: TreeLayout<INode>;

    const createTreeModel = (forestNode: INode) => {
        let margin = { top: 20, right: 40, bottom: 20, left: 40 };
        width = 1800 - margin.right - margin.left;
        height = 650 - margin.top - margin.bottom;	// This affects how the tree looks

        // diagonal = linkHorizontal().x((d) => d[1]).y((d) => d[0]);

        const svg = select(svgNode);
        if(svg.select("g").empty()) {
        svg.append("g")
            .attr("class", "links")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "nodes")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }
        treeLayout = tree<INode>().size([height, width]);
        
        update(forestNode);
    };

	useEffect(() => {
		createTreeModel(props.currentDocument.forest[0]);	// NOTE: This needs to be changed when allowing multiple trees per document
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentDocument])

    const update = (rootNode: INode) => {
        select(svgNode).selectAll("g.node").remove();
        select(svgNode).selectAll("path.link").remove();
        let root = hierarchy(rootNode, (d: INode) => d.children);
        let treeNodes = treeLayout(root);
        let nodes = treeNodes.descendants().filter((node: any) => !!node.data.nodeType);
        let links = treeNodes.descendants().filter((node: any) => !!node.data.nodeType).slice(1);
        nodes.forEach((d) => d.y = d.depth * 180);

        let allNodes = select(svgNode).select("g.nodes").selectAll("g.node")
            .data(nodes, (d: any) => d.id);

        buildNodes(allNodes);
        buildLinks(links);
        ReactTooltip.rebuild();
    }

    const buildNodes = (allNodes: any) => {
        let nodeEnter = allNodes.enter().append("g");
        nodeEnter.attr("class", "node")
            .attr("id", (d: any) => `node-${d.data.id}`)
            .attr("transform", (d: any) => {
                return "translate(" + d.y + "," + d.x + ")";
            });

		// Graphical circles for nodes
        nodeEnter.append("circle")
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
					case NodeType.norm:
						html = `<strong>Norm (entry)</strong><br/>` +
							((d.data.entry.content) ? `"${d.data.entry.content.toString()}"` : `<em>No content</em>`);
						break;
					case NodeType.convention:
						html = `<strong>Convention (entry)</strong><br/>` +
							((d.data.entry.content) ? `"${d.data.entry.content.toString()}"` : `<em>No content</em>`);
						break;
					case NodeType.junction:
						html = `<strong>Junction</strong><br/>` +
							((d.data.junctionType) ? `Operator: ${d.data.junctionType.toString()}` : `<em>No operator</em>`);
						break;
					case NodeType.negation:
						html = `<strong>Negation</strong>`;
						break;
					case NodeType.sanction:
						html = `<strong>Sanction</strong>`;
						break;
					case NodeType.component:
						// Object.assign() bypasses our constructor but for the purposes of this, we just need to print the string
						let comp = Object.assign(new Component(), d.data.component).string();
						html = `<strong>Component</strong><br/>Type: ${d.data.componentType.toString()}<br/>` +
							((comp) ? `"${comp}"` : `<em>No content</em>`);
						break;
					case NodeType.subcomponent:
						let scomp = Object.assign(new Component(), d.data.component).string();
						html = `<strong>Subcomponent</strong><br/>Type: ${d.data.subcomponentType.toString()}<br/>` +
							((scomp) ? `"${scomp}"` : `<em>No content</em>`);
						break;
					default:
						html = `<em>Missing type</em>`;
						break;
				}
				return html;
            })
            .attr("data-html", true)
            .on("click", nodeToggle)

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
            .style('font-size', (d: any) => 16 * .75 + 'px')
            .attr("data-html", true)
            .attr("pointer-events", "none")
			.attr("dy", "1")
            .text((d: any) => {
				if (d.data.junctionType) {
					return d.data.junctionType;
				} else if (d.data.nodeType === NodeType.negation) {
					return "NOT";
				} else if (d.data.componentType) {
					switch (d.data.componentType) {
						case ComponentType.attributes:
						return "A";
						case ComponentType.object:
						return "B";
						case ComponentType.deontic:
						return "D"
						case ComponentType.aim:
						return "I";
						case ComponentType.conditions:
						return "C";
					}
				}
			});

    }

    const buildLinks = (links: any) => {
        select(svgNode).select("g.links").selectAll("g.link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", (d: any) => {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            })
			.style("stroke-width", "1")
			//.style('opacity', .8);
    }

	// This is the function called on node click, opening that node's modal.
	// (It does so by setting the activeNode branch in Redux state, which the Edit component responds to.)
    const nodeToggle = (treeNode: any) => {
        if (props.preSetActiveNode) {
            props.preSetActiveNode({ node: treeNode, togglefunc: toggle, modalState: setModal });
        }
    }

    return (
        <div>
			<div className="treeContainer">
				<svg
					className="d3-component"
					width={800}
					height={500}
					ref={n => (svgNode = n)} />
			</div>
            <span>{props.currentDocument.forest[0].updatedAt.toLocaleString()}</span>
            <Modal isOpen={modal} toggle={toggle} className="modal-open">
                <Edit close={toggle} />
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.reducer.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
    preSetActiveNode: (node: INode) => dispatch(preSetActiveNode(node))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TreeComponent);
