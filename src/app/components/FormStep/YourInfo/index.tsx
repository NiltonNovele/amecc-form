"use client";

import { Fragment } from "react";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

export function YourInfo() {
  const {
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
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();
  const { saveValueToLocalStorage } = useLocalStorage();

  /** ----------------------------
   * Validate all form inputs
   * ----------------------------- */
  function validateForm() {
    let formHasError = false;

    // Name
    if (!nameField.value) {
      dispatchNameField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Name is required",
      });
      formHasError = true;
    }

    // Email
    if (!emailField.value) {
      dispatchEmailField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Email is required",
      });
      formHasError = true;
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(emailField.value)) {
        dispatchEmailField({
          type: ACTIONS.SET_ERROR,
          errorMessage: "Email is invalid",
        });
        formHasError = true;
      }
    }

    // Phone
    if (!phoneNumberField.value) {
      dispatchPhoneNumberField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Phone number is required",
      });
      formHasError = true;
    } else if (phoneNumberField.value.length < 6) {
      dispatchPhoneNumberField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Phone number is invalid",
      });
      formHasError = true;
    }

    // Address
    if (!addressField.value) {
      dispatchAddressField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Address is required",
      });
      formHasError = true;
    }

    // Passport
    if (!passportNumberField.value) {
      dispatchPassportNumberField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Passport number is required",
      });
      formHasError = true;
    }

    // Gender
    if (!genderField.value) {
      dispatchGenderField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Please select a gender or choose 'Prefer not to say'",
      });
      formHasError = true;
    }

    return !formHasError;
  }

  /** ----------------------------
   * Save to LocalStorage + Go to Next Step
   * ----------------------------- */
  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "your-info",
        JSON.stringify({
          name: nameField.value,
          email: emailField.value,
          phoneNumber: phoneNumberField.value,
          address: addressField.value,
          passportNumber: passportNumberField.value,
          gender: genderField.value,
        })
      );
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Personal Info"
          description="Please provide your personal details below."
        />

        <div className="mt-5 flex flex-col gap-4">
          {/* Name */}
          <TextInput
            label="Name"
            placeholder="e.g. Stephen King"
            value={nameField.value}
            onChange={(value: string) =>
              dispatchNameField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={nameField.errorMessage}
            clearError={() => dispatchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={nameField.hasError}
          />

          {/* Email */}
          <TextInput
            label="Email Address"
            placeholder="e.g. stephenking@lorem.com"
            value={emailField.value}
            onChange={(value: string) =>
              dispatchEmailField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={emailField.errorMessage}
            clearError={() => dispatchEmailField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={emailField.hasError}
          />

          {/* Phone */}
          <TextInput
            label="Phone Number"
            placeholder="e.g. 077123456"
            value={phoneNumberField.value}
            onChange={(value: string) =>
              dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={phoneNumberField.errorMessage}
            clearError={() =>
              dispatchPhoneNumberField({ type: ACTIONS.CLEAR_ERROR })
            }
            hasError={phoneNumberField.hasError}
          />

          {/* Address */}
          <TextInput
            label="Address"
            placeholder="e.g. 123 Main Street, Springfield"
            value={addressField.value}
            onChange={(value: string) =>
              dispatchAddressField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={addressField.errorMessage}
            clearError={() =>
              dispatchAddressField({ type: ACTIONS.CLEAR_ERROR })
            }
            hasError={addressField.hasError}
          />

          {/* Passport Number */}
          <TextInput
            label="Passport Number"
            placeholder="e.g. AB12345"
            value={passportNumberField.value}
            onChange={(value: string) =>
              dispatchPassportNumberField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={passportNumberField.errorMessage}
            clearError={() =>
              dispatchPassportNumberField({ type: ACTIONS.CLEAR_ERROR })
            }
            hasError={passportNumberField.hasError}
          />

          {/* Gender Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              value={genderField.value}
              onChange={(e) =>
                dispatchGenderField({
                  type: ACTIONS.SET_VALUE,
                  value: e.target.value,
                })
              }
              onBlur={() => dispatchGenderField({ type: ACTIONS.CLEAR_ERROR })}
              className={`border rounded-lg p-2 ${
                genderField.hasError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {genderField.hasError && (
              <span className="text-sm text-red-500">
                {genderField.errorMessage}
              </span>
            )}
          </div>
        </div>
      </Form.Card>

      {/* Footer Navigation */}
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
