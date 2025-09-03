"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Alert from "@/components/atoms/Alert";
import { useAddCounter, useDecreaseCounter, useRemoveCounter } from "../hooks/useCartAction";
import { useGetQuantity } from "../hooks/useGetQuantity";

const CartCounter = ({ id, size }: { id: string; size: string }) => {
  const { mutateAsync:remove } = useRemoveCounter(id);
  const { data } = useGetQuantity(id);
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
          disabled={addPending || decreasePending}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm">{data}</span>
        <button
          disabled={addPending || decreasePending}
          onClick={() => addOne(size)}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartCounter;
