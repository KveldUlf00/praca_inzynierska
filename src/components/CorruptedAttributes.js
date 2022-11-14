import PropTypes from "prop-types";

import Space from "./reusable/Space";

const CorruptedAttributes = ({ corruptedAttr }) => {
  return (
    <div>
      <Space />
      <div className="corrupted">
        <h4>Errors in attributes detected!</h4>
        <p>These attributes are corrupted:</p>
        {corruptedAttr.map((elem) => (
          <p key={elem} className="attribute">
            {elem}
          </p>
        ))}
        <p>They probably have a different value scale than the others.</p>
        <p>
          Due to this problem the{" "}
          <span className="blue-text">dependency analyze</span> is blocked.
        </p>
        <p>
          My recommendation: change the attributes or standardize their values
          in relation to the rest of the attributes.
        </p>
      </div>
    </div>
  );
};

CorruptedAttributes.propTypes = {
  corruptedAttr: PropTypes.array.isRequired,
};

export default CorruptedAttributes;
