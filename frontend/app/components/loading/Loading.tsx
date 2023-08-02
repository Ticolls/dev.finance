import { CircleNotch } from "phosphor-react";
import "./loading.css";

export function Loading() {
    return (
        <div className="loading-box">
            <CircleNotch weight="bold" className="animate-spin" />
        </div>
    )
}