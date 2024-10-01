function InputTwo({ label, error, ...rest }) {
    return (
        <div className="mb-1   ">
            <label htmlFor={rest.name} className="form-label fs-6 fw-bold ">
                {label}
                {rest.required && <span className="text-danger ms-1">*</span>}
            </label>

            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default InputTwo;
