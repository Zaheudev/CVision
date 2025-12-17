import './inputs.css';

export function TextInput({ label, children, name, type = "text", value, onChange, placeholder, required = false, id, disabled=false, onDisabledClick}) {
    return (
        <div 
            className="input-group"
            onClick={disabled ? onDisabledClick : undefined}
            style={{cursor: disabled?"not-allowed":"auto"}}
        >
            {label && <label htmlFor={name}>{label}</label>} 
            <div className="icon-wrap">{children}</div> 
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                style={disabled?{pointerEvents: "none"}:{}}
            />
        </div>
    );
}

export function SelectInput({ label, icon, name, value, onChange, options, required = false, id }) {
    return (
        <div className="select-group" style={{ position: 'relative' }}>
            {label && <label htmlFor={name}>{label}</label>}
            {icon && <span className="icon-wrap">{icon}</span>}
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" disabled>Candidat/Angajator</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function DescriptionInput({ label, name, value, onChange, placeholder, required = false, id, disabled = false, onDisabledClick }) {
    return (
        <div className="description-group" onClick={disabled ? onDisabledClick : undefined} style={{ cursor: disabled ? "not-allowed" : "auto" }}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                className="add-job-input"
                name={name}
                id={id || name}
                value={value}
                onChange={e => {
                    onChange && onChange(e);
                    // auto-resize logic
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                style={disabled ? { pointerEvents: "none" } : {}}
                rows={3}
            />
        </div>
    );
}