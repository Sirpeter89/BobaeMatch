import './EditPreferencesPage.css'
import React, { useState } from "react"
import ImageComponent from '../PreferencesPage/ImageComponent'
import {changePreferences} from "../../store/preferences"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"


export default function EditPreferencePage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [teaChoice, setTeaChoice] = useState("")
    const [sugarLevel, setSugarLevel] = useState(0)
    const [addons, setAddons] = useState("")
    const [gender, setGender] = useState("")

    const [lactose, setLactose] = useState(false)
    const [lactoseSetted, setlactoseSetted] = useState(false);

    const [fruit, setFruit] = useState(false)
    const [fruitSetted, setFruitSetted] = useState(false);

    const [description, setDescription] = useState("")
    const teaImage = [ ["https://cdn.pixabay.com/photo/2015/02/02/11/09/tea-620820_960_720.jpg", "Black"], ["https://cdn.pixabay.com/photo/2018/07/10/11/37/green-tea-3528474_960_720.jpg", "Green"], ["https://cdn.pixabay.com/photo/2017/06/22/17/58/phoenix-single-clump-2431867_960_720.jpg", "Oolong"], ["https://cdn.pixabay.com/photo/2021/03/08/16/30/matcha-6079527_960_720.jpg", "Matcha"], ["https://cdn.pixabay.com/photo/2014/09/24/17/48/tea-utensil-459344_960_720.jpg", "Jasmine"], ["https://cdn.pixabay.com/photo/2016/12/06/17/33/tee-1887042_960_720.jpg", "Earlgrey"], ["https://cdn.pixabay.com/photo/2019/08/13/07/12/assam-black-tea-4402670_960_720.jpg", "Assam"]]
    const sugarLevels = [ ["https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_960_720.jpg", 100],["https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_960_720.jpg", 75],["https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_960_720.jpg", 50],["https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_960_720.jpg", 25], ["https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_960_720.jpg", 0] ]
    const addonImages = [ ["https://images.unsplash.com/photo-1541696490-8744a5dc0228?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "Boba"], ["https://cdn.shopify.com/s/files/1/1161/4842/products/Orange_Boba_1024x1024.jpg?v=1477038707", "Popping Boba"], ["https://tealiciouscafe.com/wp-content/uploads/2018/10/lychee-gelatin.jpg", "Lychee Jelly"], ["https://www.honestfoodtalks.com/wp-content/uploads/2021/06/Chinese-Custard-Pudding-Dessert-1024x683.jpg", "Egg Pudding"], ["https://www.vegrecipesofindia.com/wp-content/uploads/2013/05/soaked-basil-seeds-1a.jpg", "Basil Seeds"] ]
    const genderImages = [ ["https://ak.picdn.net/shutterstock/videos/1008672844/thumb/5.jpg", "Male"], ["https://ak.picdn.net/shutterstock/videos/1021780084/thumb/8.jpg", "Female"] ]
    const lactoseImages= [["https://media.istockphoto.com/vectors/like-and-dislike-icons-collection-set-thumbs-up-and-thumbs-down-vector-id1090181018?k=6&m=1090181018&s=612x612&w=0&h=-sB6yoP13QTZU3cYT7pddZC3BeXyy0aFlopSh1ZwWMo=", true, "Yes"], ["https://www.seekpng.com/png/detail/490-4906394_thumbs-down-thumbs-down-white-png.png", false, "No"]]
    const fruitImages= [["https://images.pexels.com/photos/2616163/pexels-photo-2616163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", true, "Yes"], ["https://www.seekpng.com/png/detail/490-4906394_thumbs-down-thumbs-down-white-png.png", false, "No"]]

    const onSub = async (e) => {
        e.preventDefault();
        await dispatch(changePreferences(teaChoice, sugarLevel, addons, gender, user.id, description, lactose, fruit))
        history.push("/")
    }

    let choiceComponents;
    if(!teaChoice){
        choiceComponents =
        <div className="TeaContainer">
            {teaImage.map((tea) => (
                <div key={tea} className="choice" onClick={()=>setTeaChoice(tea[1])}>
                    <ImageComponent image={tea[0]} text={`${tea[1]} Tea`}/>
                </div>
            ))}
        </div>
    } else if (!sugarLevel){
        choiceComponents =
        <div className="TeaContainer">
            {sugarLevels.map((levels) => (
                <div key={levels} className="choice" onClick={()=>setSugarLevel(levels[1])}>
                    <ImageComponent image={levels[0]} text={`${levels[1]}%`}/>
                </div>
            ))}
        </div>
    } else if (!addons){
        choiceComponents =
        <div className="TeaContainer">
            {addonImages.map((gender) => (
                <div key={gender} className="choice" onClick={()=>setAddons(gender[1])}>
                    <ImageComponent image={gender[0]} text={`${gender[1]}`}/>
                </div>
            ))}
        </div>
    } else if (!gender){
        choiceComponents =
        <div className="TeaContainer">
            {genderImages.map((addons) => (
                <div key={addons} className="choice" onClick={()=>setGender(addons[1])}>
                    <ImageComponent image={addons[0]} text={`${addons[1]}`}/>
                </div>
            ))}
        </div>
    } else if (!lactoseSetted){
        choiceComponents =
        <div className="TeaContainer">
            {lactoseImages.map((lactose) => (
                <div key={lactose} className="choice" onClick={()=>{
                    setLactose(lactose[1]);
                    setlactoseSetted(true)}}>
                    <ImageComponent image={lactose[0]} text={`${lactose[2]}`}/>
                </div>
            ))}
        </div>
    } else if (!fruitSetted){
        choiceComponents =
        <div className="TeaContainer">
            {fruitImages.map((fruit) => (
                <div key={fruit} className="choice" onClick={()=>{
                    setFruit(fruit[1]);
                    setFruitSetted(true)}}>
                    <ImageComponent image={fruit[0]} text={`${fruit[2]}`}/>
                </div>
            ))}
        </div>
    } else {
        choiceComponents =
        <div>
            <div>
                <label>Why do you like your choices?</label>
                <input
                    type="text"
                    name="description"
                    onChange={(e)=>(setDescription(e.target.value))}
                    value={description}
                ></input>
            </div>
            <button className='submitButton' type="button" onClick={onSub}>Submit</button>
        </div>
    }

    return (
        <>
            {choiceComponents}
        </>
    )
}
