function Selectcontinue({ label, error, ...rest }) {
    return (
        <div className="mb-1">
            <label htmlFor={rest.name} className="form-label fs-6 fw-bold">
                {label}
                {rest.required && <span className="text-danger ms-1">*</span>}
            </label>
            <select

                {...rest}
                className={["form-control fs-6", error && "is-invalid"]
                    .filter(Boolean)
                    .join(" ")}
                id={rest.name}
                type="select"
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
