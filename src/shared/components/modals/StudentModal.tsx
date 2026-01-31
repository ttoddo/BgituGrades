import { Description, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from "@headlessui/react"
import Button from "../Button"


interface PropsInterface{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function StudentModal({isOpen = false, setIsOpen}: PropsInterface){


    const close = () => {
        setIsOpen(false);

    }


    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Редактирование студента
                </DialogTitle>
                    <div className="w-full max-w-md px-4">
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">ФИО студента</Label>
                            <Input
                            className=
                                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                           
                            />
                        </Field>
                    </div>
                <div className="mt-4">
                    <Button
                    onClick={close}
                    >
                    Got it, thanks!
                    </Button>
                </div>
                </DialogPanel>
            </div>
            </div>
        </Dialog>
    )

}