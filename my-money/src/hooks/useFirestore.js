import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
    //   spread out what we got in the doc contentwise, but into aa new object then chuck in the timestamp
      const addedDocument = await ref.add({...doc, createdAt});
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  //delete document
  const deleteDocument = async (id) => {};

  //cleanup function on unmounting
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};
