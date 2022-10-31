import React, { useEffect, useRef, useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import {
  select,
  forceSimulation,
  forceManyBody,
  pointer,
  forceLink,
  forceX,
  forceY,
  forceCollide,
  forceRadial,
  schemeTableau10,
} from "d3";
import useResizeObserver from "../../service/useResizeObserver";
import Properties from "./Properties";

/**
 * Component, that renders a force layout for hierarchical data.
 */

function ForceTreeChart({ data, cliques }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElData, setAnchorElData] = useState({});
  const [whichClique, setWhichClique] = useState([]);
  const [whichCliqueDegree, setWhichCliqueDegree] = useState("");
  const [cliqueSet, setCliqueSet] = useState([]);
  const [dependencyNode, setDependencyNode] = useState("");
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // const colors = schemeTableau10;
  const colors = [
    "#e6e6e6",
    "#cccccc",
    "#b3b3b3",
    "#808080",
    "#808080",
    "#666666",
    "#4d4d4d",
    "#333333",
    "#1a1a1a",
    "#000000",
  ];

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElData({});
  };

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleNodeEvent = (e, info) => {
    console.log(info);
    const allLabels = document.querySelectorAll(".label");
    const searchedLabel = [...allLabels].filter(
      (elem) => elem.innerHTML === info.name
    );
    if (searchedLabel.length > 0) {
      setAnchorEl(searchedLabel[0]);
      setAnchorElData(info);
    }
  };

  useEffect(() => {
    if (dependencyNode === -1) {
      setDependencyNode("");
    }
  }, [dependencyNode]);

  useEffect(() => {
    if (whichCliqueDegree === -1) {
      setWhichCliqueDegree("");
    }
  }, [whichCliqueDegree]);

  // will be called initially and on every data change
  useEffect(() => {
    const { nodes, links } = data;

    const handleCorrColorsForNodes = (node) => {
      if (dependencyNode && dependencyNode !== -1) {
        const chosenName = nodes.filter(
          (node) => node.index === dependencyNode
        )[0].name;

        const corrColors = {
          perfect: "#006600",
          high: "#33cc33",
          moderate: "#ffff00",
          low: "#ff6600",
          zero: "#ff0000",
        };

        const corr = Object.entries(node.correlations).filter(
          (arr) => arr[0] === chosenName
        )[0][1];

        if (corr === 1) {
          return corrColors.perfect;
        } else if (corr < 1 && corr >= 0.5) {
          return corrColors.high;
        } else if (corr < 0.5 && corr >= 0.3) {
          return corrColors.moderate;
        } else if (corr < 0.3 && corr > 0) {
          return corrColors.low;
        } else {
          return corrColors.zero;
        }
      }

      return "#000";
    };

    const handleCorrColorsForLinks = (link) => {
      if (whichClique.length > 0) {
        if (
          whichClique.includes(link.source.name) &&
          whichClique.includes(link.target.name)
        ) {
          return "red";
        }
      }

      return "black";
    };

    if (!dimensions) return;
    const svg = select(svgRef.current);

    // centering workaround
    svg.attr("viewBox", [
      -dimensions.width / 2,
      -dimensions.height / 2,
      dimensions.width,
      dimensions.height,
    ]);

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink(links)
          .id((d) => d.name)
          .distance(100)
          .strength(1)
      )
      .force("charge", forceManyBody().strength(-1).theta(0.9))
      .force("collide", forceCollide(40))
      .on("tick", () => {
        // console.log("current force", simulation.alpha());

        // current alpha text
        // svg
        //   .selectAll(".alpha")
        //   .data([data])
        //   .join("text")
        //   .attr("class", "alpha")
        //   .text(simulation.alpha().toFixed(2))
        //   .attr("x", -dimensions.width / 2 + 10)
        //   .attr("y", -dimensions.height / 2 + 25);

        // .attr("stroke", (link) =>
        //     link?.weight ? colors[Number(link.weight)] : "black"
        //   )

        // links
        svg
          .selectAll(".link")
          .data(links)
          .join("line")
          .attr("class", "link")
          .attr("stroke", (link) => handleCorrColorsForLinks(link))
          .attr("x1", (link) => link.source.x)
          .attr("y1", (link) => link.source.y)
          .attr("x2", (link) => link.target.x)
          .attr("y2", (link) => link.target.y);

        // nodes
        svg
          .selectAll(".node")
          .data(nodes)
          .join("circle")
          .attr("class", "node")
          .attr("stroke", (node) => handleCorrColorsForNodes(node))
          .attr("r", 4)
          .attr("cx", (node) => node.x)
          .attr("cy", (node) => node.y)
          .on("click", handleNodeEvent);

        // labels
        svg
          .selectAll(".label")
          .data(nodes)
          .join("text")
          .attr("class", "label")
          .attr("text-anchor", "middle")
          .attr("font-size", 20)
          .text((node) => node.name)
          .attr("x", (node) => node.x)
          .attr("y", (node) => node.y)
          .on("click", handleNodeEvent);
      });

    // svg.on("mousemove", (event) => {
    //   const [x, y] = pointer(event);
    //   simulation
    //     .force(
    //       "x",
    //       forceX(x).strength((node) => 0.2 + node.depth * 0.15)
    //     )
    //     .force(
    //       "y",
    //       forceY(y).strength((node) => 0.2 + node.depth * 0.15)
    //     );
    // });

    // svg.on("click", (event) => {
    //   const [x, y] = pointer(event);
    //   simulation
    //     .alpha(0.5)
    //     .restart()
    //     .force("orbit", forceRadial(100, x, y).strength(0.8));

    //   // render a circle to show radial force
    //   svg
    //     .selectAll(".orbit")
    //     .data([data])
    //     .join("circle")
    //     .attr("class", "orbit")
    //     .attr("stroke", "green")
    //     .attr("fill", "none")
    //     .attr("r", 100)
    //     .attr("cx", x)
    //     .attr("cy", y);
    // });
  }, [data, dimensions, dependencyNode, whichClique]);

  return (
    <>
      <div className="graph" ref={wrapperRef}>
        <svg ref={svgRef}></svg>
      </div>
      <Properties
        data={data}
        cliquesData={cliques}
        whichClique={whichClique}
        setWhichClique={setWhichClique}
        whichCliqueDegree={whichCliqueDegree}
        setWhichCliqueDegree={setWhichCliqueDegree}
        cliqueSet={cliqueSet}
        setCliqueSet={setCliqueSet}
        dependencyNode={dependencyNode}
        setDependencyNode={setDependencyNode}
      />
      <Popover
        className="popover"
        id={idPopover}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ minWidth: 200, textAlign: "center" }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            {anchorElData.name}
          </Typography>
          {anchorElData?.verticesDegree && (
            <Typography sx={{ p: 1 }}>
              Vertices degree: {anchorElData.verticesDegree}
            </Typography>
          )}
          {anchorElData?.closenessCentrality && (
            <Typography sx={{ p: 1 }}>
              Closeness centrality: {anchorElData.closenessCentrality}
            </Typography>
          )}
          {anchorElData?.group && (
            <Typography sx={{ p: 1 }}>Group: {anchorElData.group}</Typography>
          )}
          <Typography sx={{ p: 1 }}>Index: {anchorElData.index}</Typography>
        </Box>
      </Popover>
    </>
  );
}

export default ForceTreeChart;
