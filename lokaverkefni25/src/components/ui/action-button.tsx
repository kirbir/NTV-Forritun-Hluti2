"use client"
import { OrderContext, OrderStage } from '../../app/providers';
import { useContext } from "react"

type ButtonVariant = 'primary' | 'navigation' | 'delete' | 'filter';

type ButtonProps = {
    text: string;
    variant: ButtonVariant;
    stage?: OrderStage;
}

export default function ActionButton({text, variant, stage}: ButtonProps) {
const context = useContext(OrderContext)
if (!context) return null;

const {setCurrentStage} = context;

    return (
        <button 
            onClick={() => stage && setCurrentStage(stage)} 
            className={`
                rounded-lg p-2
                ${variant === 'primary' && 'bg-button-primary text-white hover:bg-green-500'}
                ${variant === 'filter' && 'bg-button-primary text-white hover:bg-green-500'}
                ${variant === 'navigation' && 'bg-button-primary border text-white hover:bg-green-500'}
                ${variant === 'delete' && 'bg-button-delete text-white hover:bg-red-600'}
            `}
        >
            {text}
        </button>
    )
}