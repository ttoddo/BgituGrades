import { Field, Input, Label } from "@headlessui/react";
import { type ChangeEvent, type ReactNode } from "react";

interface PropsInterface {
    placeholder?: string;
    children: ReactNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;

}

export default function ModalInput({placeholder, children, onChange, value, type = ""}: PropsInterface) {



    return (
        <Field className="flex flex-col gap-1 text-tLight dark:text-tLightD">
            <Label>{children}</Label>
            <Input type={type} placeholder={placeholder} onChange={onChange} value={value} className="bg-bgLight dark:bg-bgLightD rounded-sm h-10 data-focus:outline-bgLightD data-focus:outline-2"/>
        </Field>
    )
}