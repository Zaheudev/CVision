import './Button.css';

export default function ButtonPrimary({ text, onClick, children }) {
    return (
        <button className="button-form" onClick={onClick}>
            {text || children}
        </button>
    );
}