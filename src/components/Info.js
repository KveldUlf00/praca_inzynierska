const Info = () => {
  return (
    <div className="info-component">
      <p>
        The application is created as part of the engineering work, carried out
        at the turn of 2022 and 2023 at the Wrocław University of Technology in
        the field of Systems Engineering
      </p>
      <p>
        <b>The aim</b> of the work is to develop a Web tool that allows the
        visualization of nodes and links of a complex network and the user's
        selection of a subnetwork containing strongly interconnected nodes. In
        addition, the user will have availability to trace the effects of
        changing the state of the selected node on the entire subnet
      </p>
      <p>
        <b>The system aspect</b> of the work will be the ability to visualize
        the network for any user (not necessarily a programmer) by uploading any
        network. This makes the project a tool suited to the researcher and
        enables quick network analysis
      </p>
      <a href="https://pwr.edu.pl/" target="_blank" rel="noreferrer">
        <img src="logo_pwr.png" alt="Wrocław University of Technology"></img>
      </a>
    </div>
  );
};

export default Info;
