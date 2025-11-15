import './inputs.css';

export function TextInput({ label, children, name, type = "text", value, onChange, placeholder, required = false, id}) {
    return (
        <div className="input-group">
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