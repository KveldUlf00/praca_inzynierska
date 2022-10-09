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
} from "d3";
import useResizeObserver from "../service/useResizeObserver";

/**
 * Component, that renders a force layout for hierarchical data.
 */

function ForceTreeChart({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElData, setAnchorElData] = useState({});
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

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

  // will be called initially and on every data change
  useEffect(() => {
    const { nodes, links } = data;

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
          .distance(200)
          .strength(1)
      )
      .force("charge", forceManyBody().strength(-3).theta(0.9))
      .force("collide", forceCollide(20))
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

        // links
        svg
          .selectAll(".link")
          .data(links)
          .join("line")
          .attr("class", "link")
          .attr("stroke", "black")
          .attr("fill", "none")
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
  }, [data, dimensions]);

  return (
    <>
      <div className="graph" ref={wrapperRef}>
        <svg ref={svgRef}></svg>
      </div>
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
