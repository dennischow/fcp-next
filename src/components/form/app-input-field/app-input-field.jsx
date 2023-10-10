import React from "react";

const AppInputField = ({ label, type, name, placeholder, helperText, autoFocus, ...otherProps }) => {
    const { form } = otherProps;
    const isInvalid = form?.touched[name] && form?.errors[name];

    const getWrapperClassNames = () => {
        const classNames = ["app-input-field"];

        if (isInvalid) {
            classNames.push("app-input-field--invalid");
        }

        return classNames.join(" ");
    };

    return (
        <div className={getWrapperClassNames()}>
            <div className="app-input-field__form-group">
                {label ? (
                    <label className="app-input-field__label form-label" htmlFor={name}>
                        {label}
                    </label>
                ) : null}
                <input
                    className="app-input-field__input form-control"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={form?.values[name]}
                    onChange={form?.handleChange}
                    onBlur={form?.handleBlur}
                    autoFocus={autoFocus ? true : null}
                />
                {isInvalid ? (
                    <div className="app-input-field__error-message invalid-feedback">{form?.errors[name]}</div>
                ) : null}
            </div>
        </div>
    );
};

export default AppInputField;
