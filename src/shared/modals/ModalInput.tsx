import { Field, Input, Label } from "@headlessui/react";
import { type ReactNode } from "react";

interface PropsInterface {
    placeholder?: string;
    children: ReactNode;


}

export default function ModalInput({placeholder, children}: PropsInterface) {



    return (
        <Field className="flex flex-col gap-1 text-tLight dark:text-tLightD">
            <Label>{children}</Label>
            <Input placeholder={placeholder} className="bg-bgLight dark:bg-bgLightD rounded-sm h-10 data-focus:outline-bgLightD data-focus:outline-2"/>
        </Field>
    )
}