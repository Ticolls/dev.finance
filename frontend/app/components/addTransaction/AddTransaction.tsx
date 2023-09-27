'use client'

import { useState } from "react";
import { Modal } from "../modal/Modal";


export function AddTransaction() {

    const [modalOpen, setModalOpen] = useState<boolean>()

    return (
        <>
            <a className="button new" onClick={() => setModalOpen(true)}>+ Nova transação</a>

            {modalOpen ? <Modal setModalOpen={setModalOpen}/> : null}
        </>
    )
}