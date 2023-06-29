'use client'

import { ReactNode, createContext, useState } from "react";

interface ModalContextProps {
    modalStatus: boolean
    setModalStatus: (status: boolean) => void
}

interface ModalContextProviderProps {
    children: ReactNode
}

export const ModalContext = createContext<ModalContextProps>({
    modalStatus: false,
    setModalStatus: () => { }
})

export function ModalContextProvider(props: ModalContextProviderProps) {

    const [modalStatus, setModalStatus] = useState<boolean>(false)

    return (

        <ModalContext.Provider value={{ modalStatus, setModalStatus }}>
            {props.children}
        </ModalContext.Provider>
    )
}