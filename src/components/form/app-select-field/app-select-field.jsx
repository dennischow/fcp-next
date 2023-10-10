import React from "react";

const AppSelectField = ({ label, name, options, helperText, autoFocus, ...otherProps }) => {
    const { form } = otherProps;
    const isInvalid = form?.touched[name] && form?.errors[name];

    const getWrapperClassNames = () => {
        const classNames = ["app-select-field"];

        if (isInvalid) {
            classNames.push("app-select-field--invalid");
        }

        return classNames.join(" ");
    };

    return (
        <div className={getWrapperClassNames()}>
            <div className="app-select-field__form-group">
                {label ? (
                    <label className="app-select-field__label form-label" htmlFor={name}>
                        {label}
                    </label>
                ) : null}
                <select
                    className="app-select-field__input form-select"
                    name={name}
                    value={form?.values[name]}
                    onChange={form?.handleChange}
                    onBlur={form?.handleBlur}>
                    {options.map((option, index) => {
                        if (option.options) {
                            return (
                                <optgroup key={index} label={option.label}>
                                    {option.options.map((subOption, subIndex) => (
                                        <option key={subIndex} label={subOption.label} value={subOption.value}>
                                            {subOption.label}
                                        </option>
                                    ))}
                                </optgroup>
                            );
                        } else {
                            return (
                                <option key={index} label={option.label} value={option.value}>
                                    {option.label}
                                </option>
                            );
                        }
                    })}
                </select>
                {isInvalid ? (
                    <div className="app-select-field__error-message invalid-feedback">{form?.errors[name]}</div>
                ) : null}
            </div>
        </div>
    );
};

export default AppSelectField;
