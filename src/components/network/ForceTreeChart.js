import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Popover, Typography } from "@mui/material";
import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCollide,
  forceCenter,
} from "d3";
import useResizeObserver from "../../service/useResizeObserver";
import Properties from "./Properties";
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

  const ColorScale = require("color-scales");

  let colorScale = new ColorScale(0, 100, ["#ff0000", "#009933"], 1);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElData({});
  };

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleNodeEvent = (e, info) => {
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

  useEffect(() => {
    const { nodes, links } = data;

    const handleCorrColorsForNodes = (node) => {
      if (dependencyNode && dependencyNode !== -1) {
        const chosenName = nodes.filter(
          (node) => node.index === dependencyNode
        )[0].name;

        const corr = Object.entries(node.correlations).filter(
          (arr) => arr[0] === chosenName
        )[0][1];

        const corrColor = colorScale
          .getColor(corr > 0 ? Math.floor(corr * 100) : 0)
          .toHexString();

        return corrColor;
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
      .force("center", forceCenter())
      .on("tick", () => {
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

ForceTreeChart.propTypes = {
  data: PropTypes.object.isRequired,
  cliques: PropTypes.array.isRequired,
};

export default ForceTreeChart;
