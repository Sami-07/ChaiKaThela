import "./ThemeSelector.css"
import AOS from "aos"
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme"
import { useHistory } from 'react-router-dom';
const themeColors = ["#6927FF", "brown", "#FF2171"]
// #FF2171
// #FC7300
export default function ThemeSelector() {  
    const history = useHistory();
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const { changeColor } = useTheme()

    return (
        <div className="themeSelector" data-aos="fade-up" >
            <p className="customiseThemeP">Customise Theme</p>
            <div className="themeButtons" data-aos="fade-up">

                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => {
                            changeColor(color)
                            history.push("/")
                                }
                        }
                        
                style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}