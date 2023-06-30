import "./Backdrop.css"
import { ClipLoader } from "react-spinners"
export default function Backdrop() {
    return (
        <div className="backDropMain">
            <h1>Loading</h1>
            <ClipLoader color="brown" size={50} />
        </div>
    )
}