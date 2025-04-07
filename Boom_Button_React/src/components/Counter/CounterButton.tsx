import { CounterButtonProps } from "./types";

const CounterButton = ({ count, onPlus, onMinus }: CounterButtonProps) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <p className="text-3xl mb-4 text-center">{count}</p>
      </div>
      
      <div className="flex flex-row space-x-4">
        <button className="border-2 p-10 text-2xl" type="button" onClick={onPlus}>
         +
        </button>
        <button className="border-2 p-10 text-2xl" type="button" onClick={onMinus}>
          -
        </button>
      </div>

    </div>
  );
};

export default CounterButton;
