function Selectcontinue({ label, error, name, ...rest }) {
    return (
        <div className="mb-1">
            <label htmlFor={name} className="form-label fs-6 fw-bold">
                {label}
                {rest.required && <span className="text-danger ms-1">*</span>}
            </label>
            <select
                name={name} // Make sure the name is passed here
                id={name}   // Also set the id for accessibility
                {...rest}   // This will include value, onChange, etc.
                className={["form-control fs-6", error && "is-invalid"]
                    .filter(Boolean)
                    .join(" ")}
            >
                <option value="ממשיך">כן ממשיך</option>
                <option value="סיים">סיים</option>
                <option value="מעקב">במעקב</option>
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default Selectcontinue;
