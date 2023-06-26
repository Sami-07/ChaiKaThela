import "./Backdrop.css"
export default function Backdrop({ text }) {
    return (
        <div className="backdrop">
        <div className="backdropCenter">
            {text}
            </div>
        </div>
    )
}