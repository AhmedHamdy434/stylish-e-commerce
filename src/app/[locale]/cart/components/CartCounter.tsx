"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Alert from "@/components/atoms/Alert";
import {
  useAddCounter,
  useDecreaseCounter,
  useRemoveCounter,
} from "../hooks/useCartAction";

const CartCounter = ({
  id,
  size,
  quantity,
}: {
  id: string;
  size: string;
  quantity: number;
}) => {
  const { mutateAsync: remove } = useRemoveCounter(id);
  const { mutateAsync: addOne, isPending: addPending } = useAddCounter(id);
  const { mutateAsync: decreaseOne, isPending: decreasePending } =
    useDecreaseCounter(id);

  return (
    <div className="flex ms-auto flex-col justify-between">
      <Alert
        button={<Trash2 className="ms-auto text-destructive" />}
        buttonName={"Remove From Cart"}
        head="Are you sure to remove this on your cart?"
        confirmFunction={() => remove()}
      />
      <div className="bg-secondary flex items-center py-2 px-4 rounded-lg gap-3">
        <button
          onClick={() => decreaseOne()}
          disabled={addPending || decreasePending || quantity === 1}
          className="disabled:opacity-40 disabled:cursor-default!"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          disabled={addPending || decreasePending}
          onClick={() => addOne(size)}
          className="disabled:opacity-40 disabled:cursor-default!"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartCounter;
