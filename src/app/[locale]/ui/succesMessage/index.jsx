export default function SuccessMessage ({ message, showSuccessMessage, className }) {
    return (
        <div className={`${className} ${showSuccessMessage ? 'show' : 'fade-out'}`}>
            {message}
        </div>
    );
}
