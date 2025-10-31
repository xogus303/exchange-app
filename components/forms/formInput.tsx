import { Controller, useFormContext } from "react-hook-form";
import Label from "./label";
import { Input } from "../ui/input";
import { cn, formatComma } from "@/lib/utils";

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder = "",
  unit,
  inputClassName,
  unitClassName,
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  unit?: string;
  inputClassName?: string;
  unitClassName?: string;
} & React.ComponentProps<"input">) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label htmlFor={id} text={label} />
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <label
            htmlFor={id}
            className={cn(
              "flex border items-center border-gray-700 rounded-lg bg-white cursor-text",
              props.readOnly && "bg-gray-100"
            )}
          >
            <Input
              ref={field.ref}
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              className={cn(
                "flex-1 p-6 text-xl text-gray-600 font-semibold border-none",
                inputClassName,
                unit && "pr-2.5",
                props.readOnly &&
                  "focus-visible:outline-none focus-visible:ring-0"
              )}
              {...props}
            />
            {unit && (
              <span className={cn("pr-6 text-gray-600", unitClassName)}>
                {unit}
              </span>
            )}
          </label>
        )}
      />
      {errors[id] && (
        <p className="text-sm text-red-600">{errors[id]?.message as string}</p>
      )}
    </div>
  );
}
