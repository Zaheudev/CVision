import './AuthContainer.css';

export default function AuthContainer({ title, children }) {
    return (
        <div className="auth-container">
            <h2>{title}</h2>
            {children}
        </div>
    );
}