import "./CustomRecipe.css"
import transparentTea from "../../images/TransparantTeaAI.png"
import MyInput from "../../components/myinput/MyInput"
import MyButton from "../../components/custombtn/MyButton"
import { useEffect, useState, useRef } from "react"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import AOS from "aos"
import "aos/dist/aos.css";
import Backdrop from "../../components/backdrop/Backdrop"
import { useTheme } from "../../hooks/useTheme"

export default function CustomRecipe() {
    const { color, changeColor } = useTheme()
    const { user } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const { addDocument, response } = useFirestore("customRecipe")
    const [recipeName, setRecipeName] = useState("")
    const [newIngredient, setNewIngredient] = useState("")
    const [recipeDesc, setRecipeDesc] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false);
    const ingredientInput = useRef(null)
    function handleSubmit(e) {
        setIsPending(true)
        e.preventDefault();
        addDocument({ recipeName: recipeName, customIngs: ingredients, price: 69, cookingInstr: recipeDesc, uid: user.uid }).then(() => {
            setTimeout(()=>{
                setIsPending(false)
            },1000)
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 4000);
            setRecipeName("");
            setRecipeDesc("");
            setIngredients([]);
        })

    }
    function handleAdd(e) {
        e.preventDefault();
        const ing = newIngredient.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient("")

        ingredientInput.current.focus()
    }
    return (
        <div data-aos="fade-up" >
   {isPending ? <Backdrop /> : ""}
            <div className="customRecipeMain"  >

                <div class="customRecipeHookImg">
                    <img src={transparentTea} className="" />
                </div>
                <div><p className="hook1" >Brew your own Tea Virtually.</p>
                    <p className="hook2">Share your secret Tea recipe with us
                        and we will brew it for you.</p></div>

            </div>
            <div className="flexList">
                <div className="flexSub">
                    <p className="inst1">  </p>
                    <div>
                        <p className="customIngredientsHead" style={{ color: color }}>Add your custom Ingredients with quantity and units.</p>
                        <form onSubmit={handleSubmit} className="ingForms" >
                            <input type="text" placeholder="Recipe Name" onChange={(e) => setRecipeName(e.target.value)} value={recipeName} />
                            <div className="inputBtnDiv">
                    
                            <div className="customIngredients">
                                <input type="text" placeholder="Ingredient Name" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} ref={ingredientInput} />

                            </div>
                            <div className="btnC">
                            <MyButton btnText="ADD" functionName={handleAdd} width="120px" height="45px" fontSize="20px" borderRadius="10px" bgColor={color} btnContainerDisplay="block" />
                            </div>
                                    </div>
                            <label>
                                <p className="instructionsHead">Additional Instructions for brewing your Tea.</p>
                                <textarea className="recipeDesc" value={recipeDesc} onChange={(e) => setRecipeDesc(e.target.value)} placeholder="eg : use less water and more milk." />
                            </label>
                            {!isSubmitted && <MyButton btnText="ADD TO CART" width="150px" fontSize="17px" borderRadius="10px" height="50px" bgColor={color}></MyButton>}

                        </form>
                     
                        {isSubmitted && <MyButton btnText="ADDED" width="150px" fontSize="17px" borderRadius="10px" height="50px" bgColor="green" ></MyButton>}
                    </div>
                </div>
                <div className="ingrList">
                    <h3>Ingredients Added </h3>
                    {ingredients.map((i) =>
                        <p className="eachPrintIng" key={i}>{i}</p>
                    )}
                </div>
            </div>
        </div>
    )
}