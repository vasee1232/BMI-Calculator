import React from "react";
import PropTypes from "prop-types";

const forminputs = (props) => {
  const { name, value, title, type, onChange } = props;
  return (
    <div className='input-groups'>
      <span className='label'>{title}</span>
      <div className='range-container'>
        <input
          name={name}
          value={value}
          className='range-input'
          type={type}
          onChange={onChange}
          autoComplete='false'
        />
      </div>
    </div>
  );
};

forminputs.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text"]),
};

export default forminputs;
