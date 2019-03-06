import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  label,
  onChange
}) => {
  return (
    <div className="form__group">
      <textarea
        className={classnames("form__input", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor="name"
        style={{ transform: "translateY(-9.5rem)" }}
        className={classnames("form__label", {
          "invalid-feedback": error
        })}
      >
        {error ? error : label}
      </label>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
