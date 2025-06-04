"use client"
import { OrderContext, OrderStage, useOrder } from '../../app/providers';
import { useContext, useState } from "react"

type ButtonVariant = 'primary' | 'navigation' | 'delete' | 'filter' | 'place-order';

type ButtonProps = {
    text: string;
    variant: ButtonVariant;
    stage?: OrderStage;
}

export default function ActionButton({text, variant, stage}: ButtonProps) {
    const { submitOrderForm, setCurrentStage } = useOrder();
    const context = useContext(OrderContext)
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!context) return null;

    const handleClick = async () => {
        if (variant === 'place-order' && typeof submitOrderForm === 'function') {
            if (isSubmitting) return;
            setIsSubmitting(true);
            try {
                await submitOrderForm();
            } finally {
                setIsSubmitting(false);
            }
        } else if (stage) {
            setCurrentStage(stage);
        }
    };

    return (
        <button 
            onClick={handleClick}
            className={`
                rounded-lg p-2
                ${variant === 'primary' && 'bg-button-card text-white  py-2 px-4 rounded hover:bg-button-primary/50'} 
                ${variant === 'filter' && 'bg-button-primary text-white hover:bg-green-500'}
                ${variant === 'navigation' && 'w-full bg-button-card  text-white hover:bg-button-primary/50'}
                ${variant === 'delete' && ' bg-button-delete text-white hover:bg-red-600'}
                ${variant === 'place-order' && 'bg-button-primary text-white hover:bg-green-500'}
            `}
        >
            {text}
        </button>
    )
}