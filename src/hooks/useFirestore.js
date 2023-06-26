import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config"
import { act } from "react-dom/test-utils";
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
function firestoreReducer(state, action) {
    switch (action.type) {
        case "IS_PENDING":
            return { document: null, success: false, error: null, isPending: true }
        case "ADDED_DOCUMENT":
            return { error: null, isPending: false, document: action.payload, success: true }
        case "ERROR":
            return { isPending: false, document: null, success: false, error: action.payload }
        case "DELETED_DOCUMENT":
            return { isPending: false, document: null, success: true, error: null }
        default:
            return state
    }
}
export function useFirestore(collection) {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection reference
    const ref = projectFirestore.collection(collection)
    //add document
    async function addDocument(doc) {
        dispatch({ type: "IS_PENDING" })
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatch({ type: "ERROR", payload: err.message })
        }
    }
    //delete document
    async function deleteDocument(id) {
        dispatch({ type: "IS_PENDING" })
        try {
            await ref.doc(id).delete()
            dispatch({ type: "DELETED_DOCUMENT" })
        }
        catch (err) {
            dispatch({ type: "ERROR", payload: "Couldn't delete" })
        }
    }

    return { addDocument, deleteDocument, response }

}
