function Checkbox({ label, error, ...rest }) {
    return (
        <div className="mb-1 p-3">
            <div className="form-check p-3 m-1">
                <input
                    {...rest}
                    type="checkbox"
                    className={["fs-4 bg-dark form-check-input", error && "is-invalid"]
                        .filter(Boolean)
                        .join(" ")}
                    id={rest.name}
                />
                <label htmlFor={rest.name} className="form-check-label fs-6 fw-bold">
                    {label}
                    {rest.required && <span className="text-danger ms-1">*</span>}
                </label>
                <div >
                    מאשר שבמידה ואבטל פחות מ 24 שעות ממועד הטיפול אחוייב בדמי ביטול</div>
            </div>
        </div>
    );
}
export default Checkbox;
