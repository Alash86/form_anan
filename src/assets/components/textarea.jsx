function Textarea({ label, error, ...rest }) {
    return (
        <div className="mb-1   ">
            <label htmlFor={rest.name} className="form-label fs-6 fw-bold ">
                {label}
                {rest.required && <span className="text-danger ms-1">*</span>}
            </label>
            <textarea
                style={{ height: 150 }}
                {...rest}
                className={["form-control fs-6", error && "is-invalid"]
                    .filter(Boolean)
                    .join(" ")}
                id={rest.name}
            />
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Textarea