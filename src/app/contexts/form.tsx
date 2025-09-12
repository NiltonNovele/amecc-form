"use client";

import { createContext, useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

/** Field State */
type Field = {
  value: string;
  hasError: boolean;
  errorMessage: string;
};

const initialState: Field = {
  value: "",
  hasError: false,
  errorMessage: "",
};

/** Actions */
export const ACTIONS = {
  SET_VALUE: "SET_VALUE",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

function handleFormState(state: Field, action: any): Field {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: "",
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        hasError: false,
        errorMessage: "",
      };
    default:
      return state;
  }
}

/** Context Data Shape */
type FormContextData = {
  // Personal Info
  nameField: Field;
  dispatchNameField: React.Dispatch<any>;
  emailField: Field;
  dispatchEmailField: React.Dispatch<any>;
  phoneNumberField: Field;
  dispatchPhoneNumberField: React.Dispatch<any>;
  addressField: Field;
  dispatchAddressField: React.Dispatch<any>;
  passportNumberField: Field;
  dispatchPassportNumberField: React.Dispatch<any>;
  genderField: Field;
  dispatchGenderField: React.Dispatch<any>;

  // Education Info
  universityField: Field;
  dispatchUniversityField: React.Dispatch<any>;
  yearOfStudyField: Field;
  dispatchYearOfStudyField: React.Dispatch<any>;
  fieldOfStudyField: Field;
  dispatchFieldOfStudyField: React.Dispatch<any>;
  graduationDateField: Field;
  dispatchGraduationDateField: React.Dispatch<any>;
  studyModeField: Field;
  dispatchStudyModeField: React.Dispatch<any>;

  // Add-ons or extras
  addOns: { title: string; description: string; price: number }[];
  setAddOns: React.Dispatch<
    React.SetStateAction<
      { title: string; description: string; price: number }[]
    >
  >;

  clearForm: () => void;
};

export const FormContext = createContext<FormContextData>({
  // Personal
  nameField: initialState,
  dispatchNameField: () => {},
  emailField: initialState,
  dispatchEmailField: () => {},
  phoneNumberField: initialState,
  dispatchPhoneNumberField: () => {},
  addressField: initialState,
  dispatchAddressField: () => {},
  passportNumberField: initialState,
  dispatchPassportNumberField: () => {},
  genderField: initialState,
  dispatchGenderField: () => {},

  // Education
  universityField: initialState,
  dispatchUniversityField: () => {},
  yearOfStudyField: initialState,
  dispatchYearOfStudyField: () => {},
  fieldOfStudyField: initialState,
  dispatchFieldOfStudyField: () => {},
  graduationDateField: initialState,
  dispatchGraduationDateField: () => {},
  studyModeField: initialState,
  dispatchStudyModeField: () => {},

  // Extras
  addOns: [],
  setAddOns: () => {},
  clearForm: () => {},
});

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  // --- Personal Info ---
  const [nameField, dispatchNameField] = useReducer(
    handleFormState,
    initialState
  );
  const [emailField, dispatchEmailField] = useReducer(
    handleFormState,
    initialState
  );
  const [phoneNumberField, dispatchPhoneNumberField] = useReducer(
    handleFormState,
    initialState
  );
  const [addressField, dispatchAddressField] = useReducer(
    handleFormState,
    initialState
  );
  const [passportNumberField, dispatchPassportNumberField] = useReducer(
    handleFormState,
    initialState
  );
  const [genderField, dispatchGenderField] = useReducer(
    handleFormState,
    initialState
  );

  // --- Education Info ---
  const [universityField, dispatchUniversityField] = useReducer(
    handleFormState,
    initialState
  );
  const [yearOfStudyField, dispatchYearOfStudyField] = useReducer(
    handleFormState,
    initialState
  );
  const [fieldOfStudyField, dispatchFieldOfStudyField] = useReducer(
    handleFormState,
    initialState
  );
  const [graduationDateField, dispatchGraduationDateField] = useReducer(
    handleFormState,
    initialState
  );
  const [studyModeField, dispatchStudyModeField] = useReducer(
    handleFormState,
    initialState
  );

  // --- Add-ons / Extra Data ---
  const [addOns, setAddOns] = useState<
    { title: string; description: string; price: number }[]
  >([]);

  const { getValueFromLocalStorage, removeValueFromLocalStorage } =
    useLocalStorage();

  /** Clear form completely */
  function clearForm() {
    removeValueFromLocalStorage("your-info");
    removeValueFromLocalStorage("education-info");
    removeValueFromLocalStorage("add-ons");

    // Reset all fields
    dispatchNameField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchEmailField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchAddressField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchPassportNumberField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchGenderField({ type: ACTIONS.SET_VALUE, value: "" });

    dispatchUniversityField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchYearOfStudyField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchFieldOfStudyField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchGraduationDateField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchStudyModeField({ type: ACTIONS.SET_VALUE, value: "" });

    setAddOns([]);
  }

  /** Load persisted values on first render */
  useEffect(() => {
    const yourInfoFromLocalStorage = getValueFromLocalStorage("your-info");
    if (yourInfoFromLocalStorage) {
      dispatchNameField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.name,
      });
      dispatchEmailField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.email,
      });
      dispatchPhoneNumberField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.phoneNumber,
      });
      dispatchAddressField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.address,
      });
      dispatchPassportNumberField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.passportNumber,
      });
      dispatchGenderField({
        type: ACTIONS.SET_VALUE,
        value: yourInfoFromLocalStorage.gender,
      });
    }

    const educationFromLocalStorage =
      getValueFromLocalStorage("education-info");
    if (educationFromLocalStorage) {
      dispatchUniversityField({
        type: ACTIONS.SET_VALUE,
        value: educationFromLocalStorage.university,
      });
      dispatchYearOfStudyField({
        type: ACTIONS.SET_VALUE,
        value: educationFromLocalStorage.yearOfStudy,
      });
      dispatchFieldOfStudyField({
        type: ACTIONS.SET_VALUE,
        value: educationFromLocalStorage.fieldOfStudy,
      });
      dispatchGraduationDateField({
        type: ACTIONS.SET_VALUE,
        value: educationFromLocalStorage.graduationDate,
      });
      dispatchStudyModeField({
        type: ACTIONS.SET_VALUE,
        value: educationFromLocalStorage.studyMode,
      });
    }

    const addOnsFromLocalStorage = getValueFromLocalStorage("add-ons");
    if (addOnsFromLocalStorage) {
      setAddOns(addOnsFromLocalStorage);
    }
  }, []);

  const value: FormContextData = {
    // Personal Info
    nameField,
    dispatchNameField,
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField,
    addressField,
    dispatchAddressField,
    passportNumberField,
    dispatchPassportNumberField,
    genderField,
    dispatchGenderField,

    // Education Info
    universityField,
    dispatchUniversityField,
    yearOfStudyField,
    dispatchYearOfStudyField,
    fieldOfStudyField,
    dispatchFieldOfStudyField,
    graduationDateField,
    dispatchGraduationDateField,
    studyModeField,
    dispatchStudyModeField,

    // Add-ons
    addOns,
    setAddOns,
    clearForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
