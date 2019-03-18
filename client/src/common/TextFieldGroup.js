import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  label,
  onChange,
  disabled
}) => {
  return (
    <div className="form__group">
      <input
        type={type}
        className={classnames("form__input", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor="name"
        className={classnames("form__label", {
          "invalid-feedback": error
        })}
      >
        {error ? error : label}
      </label>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;

/* <label
htmlFor="name"
className={classnames("form__label", {
  "invalid-feedback": error
})}
>
{error ? error : label}
</label> */
