import './buttons.css';

export default function ButtonPrimary({ text, onClick }) {
    return (
        <button className="button-form" onClick={onClick}>
            {text}
        </button>
    );
}