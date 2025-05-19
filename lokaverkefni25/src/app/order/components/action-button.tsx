"use client"
import { OrderContext, OrderStage } from '../../providers';
import { useContext } from "react"

type ButtonProps = {
    text: string,
    primary:boolean,
    stage:OrderStage
}
export default function ActionButton({text,primary,stage}:ButtonProps)  {
const context = useContext(OrderContext)
if (!context) return null;

const {setCurrentStage} = context;

    return (
        primary? <button onClick={()=> setCurrentStage(stage)} className="bg-green-700 p-2 hover:bg-green-500">{text}</button> : <button className="bg-transparent p-2 hover:bg-green-500 border border-green-700">{text}</button> 
    )

}