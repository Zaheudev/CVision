import './Button.css';

export default function ButtonPrimary({ text, onClick }) {
    return (
        <button className="button-form" onClick={onClick}>
            {text}
        </button>
    );
}