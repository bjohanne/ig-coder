import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { select, tree, hierarchy, scaleOrdinal, TreeLayout } from "d3";
import { INode } from "../../core/model/interfaces";
import { Modal } from 'reactstrap';
import { preSetActiveNode } from "../../state/actions";
import "./tree.css";
import Edit from "./edit";
import { NodeType, ComponentType } from "../../core/model/enums";
import ReactTooltip from "react-tooltip";


interface Proptype {
    node: INode,
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
        let margin = { top: 20, right: 120, bottom: 20, left: 120 };
        width = 960 - margin.right - margin.left;
        height = 500 - margin.top - margin.bottom;

        // diagonal = linkHorizontal().x((d) => d[1]).y((d) => d[0]);

        const svg = select(svgNode);

        svg.append("g")
            .attr("class", "links")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "nodes")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        treeLayout = tree<INode>().size([height, width]);
        console.log("Create Tree Model");
        update(forestNode);

    };

    /* The useEffect Hook is for running side effects outside of React,
    for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            createTreeModel(props.node);
        })

    const update = (rootNode: INode) => {
        select(svgNode).selectAll("nodes").remove();
        let root = hierarchy(rootNode, (d: INode) => d.children);
        let treeNodes = treeLayout(root);
        let nodes = treeNodes.descendants().filter((node: any) => !!node.data.nodeType);
        let links = treeNodes.descendants().filter((node: any) => !!node.data.nodeType).slice(1);
        nodes.forEach((d) => d.y = d.depth * 180);

        let allNodes = select(svgNode).select("g.nodes").selectAll("g.node")
            .data(nodes, (d: any) => d.id);

        buildNodes(allNodes);
        buildLinks(links);
        ReactTooltip.rebuild()
    }

    const buildNodes = (allNodes: any) => {
        let nodeColorScaler = scaleOrdinal()
            .domain([NodeType.component, NodeType.composite, NodeType.junction, NodeType.negation, NodeType.norm, NodeType.sanction, NodeType.subcomponent])
            .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", "#FFFFBF", "#FEE08B"]);
        let componentColorScaler = scaleOrdinal()
            .domain([ComponentType.aim, ComponentType.attributes, ComponentType.conditions, ComponentType.deontic, ComponentType.object])
            .range(["#f45905", "#010038", "#f35588", "#7c0a02", "#91b029"])

        let nodeEnter = allNodes.enter().append("g");
        nodeEnter.attr("class", "node")
            .attr("id", (d: any) => `node-${d.data.id}`)
            .attr("transform", (d: any) => {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeEnter.append("circle")
            .attr("fill", (d: any) => {
                if (d.data.nodeType === NodeType.component) {
                    return componentColorScaler(d.data.componentType);
                }
                return nodeColorScaler(d.data.nodeType);
            })
            .attr("r", 16)
            .attr("data-tip", (d: any) => {
                if (d.data.nodeType === NodeType.component && d.data.component.content) {
                    return `<strong>${d.data.nodeType}</strong><br/><strong>${d.data.componentType}</strong>: ${(d.data.component && d.data.component.content.main) || "Empty"}`;
                }
                return `${d.data.nodeType && d.data.nodeType.toString()} ${d.data.subcomponentType || ""}` || `<strong>Missing type</strong>`;
            })
            .attr("data-html", true)
            .on("click", nodeToggle)

        nodeEnter.append("text")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', (d: any) => 20 * .75 + 'px')
            .attr("fill-opacity", 1)
            .attr("fill", "white")
            .attr("pointer-events", "none")
            .attr("data-tip", (d: any) => {
                if (d.data.nodeType === NodeType.component && d.data.component.content) {
                    return `<strong>${d.data.nodeType}</strong><br/><strong>${d.data.componentType}</strong>: ${(d.data.component && d.data.component.content.main) || "Empty"}`;
                }
                return `${d.data.nodeType && d.data.nodeType.toString()} ${d.data.subcomponentType || ""}` || `<strong>Missing type</strong>`;
            })
            .attr("data-html", true)
            .text((d: any) => d.data.id);
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
    }

    const nodeToggle = (treeNode: any) => {
        if (props.preSetActiveNode) {
            props.preSetActiveNode({ node: treeNode, togglefunc: toggle });
        }
    }

    return (
        <>
            <svg
                className="d3-component"
                width={800}
                height={400}
                ref={n => (svgNode = n)} />
            <Modal isOpen={modal} toggle={toggle} className="modal-open">
                <Edit close={toggle} />
            </Modal>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    document: state.reducer.document
});

const mapDispatchToProps = (dispatch: any) => ({
    preSetActiveNode: (node: INode) => dispatch(preSetActiveNode(node))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TreeComponent);
