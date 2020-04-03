import './graph.css'
import React, { useRef, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { NodeType } from "../core/model/enums";
import * as d3 from "d3";
import Document from "../core/model/document";

interface IProps {
    document: Document;
}

/*
Data structure given to D3
Changes from Bloo's original:
name => nodeType (done)

Code:
Always check nodeType before accessing specific properties.
*/

export function GraphComponent(props: IProps) {
    const d3Container = useRef(null);

	const [tree, updateTree] = useState({"id": 1, "nodeType": "Root"});	// D3 renders the graph from the state variable tree

    useEffect(() => {
        if (tree && d3Container.current) {
            drawGraph(tree, d3Container.current);
        }
        ReactTooltip.rebuild();
    }, [tree]);

    return (
        <div>
            <svg className="d3-component" width={1000} height={676} ref={d3Container}/>
            <ReactTooltip className="tooltipHover" delayHide={1000} effect="solid" />
        </div>
    );
}

function drawGraph(data: object, container: any) {

  // Set the dimensions and margins of the diagram
  let margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 1000 - margin.left - margin.right,
      height = 676 - margin.top - margin.bottom;

  // append the svg object to the container
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select(container).append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  let i = 0,
      duration = 750,
      root: any;

  // declares a tree layout and assigns the size
  let treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(data, function(d: any) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse after the second level
  //root.children.forEach(collapse);

  update(root);

  // Collapse the node and all its children
  // function collapse(d) {
  //   if(d.children) {
  //     d._children = d.children
  //     d._children.forEach(collapse)
  //     d.children = null
  //   }
  // }

  function colorForNodes(nodeData: any) {
    let color = "#fff";

    switch(nodeData.nodeType) {
      case "Norm":
        color = "#056f00";
        break;
      case "Convention":
        color = "#056f00";
        break;
      case "Component":
        color = "#057cbb";
        break;
      case "Subcomponent":
        color = "#004e78";
        break;
      case "Junction":
        color = "#fcc536"
        break;
      case "Negation":
        color = "#f44336"
        break;
	  default:
	    color = "#ffffff"
    }

    return color;
  }

  function colorForCollapsedNode(nodeData: any) {
    let color = "lightsteelblue";

    switch(nodeData.nodeType) {
        case "Norm":
          color = "#056f00";
          break;
        case "Convention":
          color = "#056f00";
          break;
        case "Component":
          color = "#057cbb";
          break;
        case "Subcomponent":
          color = "#004e78";
          break;
        case "Junction":
          color = "#fcc536"
          break;
        case "Negation":
          color = "#f44336"
          break;
		default:
	      color = "#ffffff"
    }

    return color;
  }

  function update(source: any) {

    // Assigns the x and y position for the nodes
    let treeData = treemap(root);

    // Compute the new tree layout
    let nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth
    nodes.forEach(function(d: any){ d.y = d.depth * 180});

    // Update the nodes
    let node = svg.selectAll('g.node')
        .data(nodes, function(d: any) {return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position
    let nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return `translate(${source.y0}, ${source.x0})`;
      })
      .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('data-tip', function(d: any) {
            switch (d.data.nodeType) {
                case "Root":	// Initial node to start building the tree from
                    return `<strong>Root</strong><br/><button>Create entry</button>`;
                case NodeType.component:
                    return `<strong>${d.data.nodeType}</strong><br/><strong>${d.data.componentType}</strong>: ${d.data.component.content.prefix} ${d.data.component.content.main} ${d.data.component.content.suffix}`;
                default:
                    return d.data.nodeType.toString();
            }
        })
        .attr('data-html', true)
        .attr('id', function(d: any) {
            return `node-${d.data.id}`;
        })
        .attr('title', function(d: any) {
          return d.data.type || d.data.nodeType;
        })
        .attr('data-content', function(d: any) {
          let content = `<p class="${d.data.nodeType}">${"N/A"}</p>`;

          if (d.data.nodeType === 'Norm' || d.data.nodeType === 'Convention') {
            content += '<a href="#" class="btn btn-primary btn-block">Edit</a>'
          } else if (d.data.nodeType === 'Junction') {
            content = `
              <div class="row">
                <div class="col-8">
                  <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm" value=${d.data.junction.junctionType}>
                </div>
                <div class="col-4 text-center">
                  <a href="#" class="btn btn-success">Save</a>
                </div>
              </div>
            `
          }

          return content;
        })
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d: any) {
            return d._children ? colorForCollapsedNode(d.data) : colorForNodes(d.data);
        });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d: any) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d: any) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d: any) { return d.data.type || d.data.nodeType; });

    // UPDATE
    let nodeUpdate = nodeEnter.merge(node as any);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
          return `translate(${d.y}, ${d.x})`;
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d: any) {
          return d._children ? colorForCollapsedNode(d.data) : colorForNodes(d.data);
      })
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    let nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d: any) {
            return `translate(${source.y}, ${source.x})`;
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // Update the links
    let link = svg.selectAll('path.link')
        .data(links, function(d: any) { return d.id; });

    // Enter any new links at the parent's previous position
    let linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d: any){
          let o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        });

    // UPDATE
    let linkUpdate = linkEnter.merge(link as any);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d: any){ return diagonal(d, d.parent) });

    // Remove any exiting links
    link.exit().transition()
        .duration(duration)
        .attr('d', function(d: any) {
          let o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d: any){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s: any, d: any) {

      let path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path;
    }

    // Toggle children on click.
    function click(d: any) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
    }
  }
}

export default GraphComponent;
