"use client";

import { Fragment } from "react";

import { Footer } from "../../Footer";
import Form from "../../Form";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";

import { TextInput } from "../../Form/TextInput";

export function Education() {
  const {
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
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();
  const { saveValueToLocalStorage } = useLocalStorage();

  /** ----------------------------
   * Validate form before proceeding
   * ----------------------------- */
  function validateForm() {
    let formHasError = false;

    if (!universityField.value) {
      dispatchUniversityField({
        type: "SET_ERROR",
        errorMessage: "University name is required",
      });
      formHasError = true;
    }

    if (!yearOfStudyField.value) {
      dispatchYearOfStudyField({
        type: "SET_ERROR",
        errorMessage: "Year of study is required",
      });
      formHasError = true;
    }

    if (!fieldOfStudyField.value) {
      dispatchFieldOfStudyField({
        type: "SET_ERROR",
        errorMessage: "Field of study is required",
      });
      formHasError = true;
    }

    if (!graduationDateField.value) {
      dispatchGraduationDateField({
        type: "SET_ERROR",
        errorMessage: "Expected graduation date is required",
      });
      formHasError = true;
    }

    if (!studyModeField.value) {
      dispatchStudyModeField({
        type: "SET_ERROR",
        errorMessage: "Please select your study mode",
      });
      formHasError = true;
    }

    return !formHasError;
  }

  /** ----------------------------
   * Save values & go forward
   * ----------------------------- */
  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "education-info",
        JSON.stringify({
          university: universityField.value,
          yearOfStudy: yearOfStudyField.value,
          fieldOfStudy: fieldOfStudyField.value,
          graduationDate: graduationDateField.value,
          studyMode: studyModeField.value,
        })
      );
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Education Information"
          description="Please provide your current education details."
        />

        <div className="mt-5 flex flex-col gap-4">
          {/* University */}
          <TextInput
            label="University"
            placeholder="e.g. University of Cape Town"
            value={universityField.value}
            onChange={(value: string) =>
              dispatchUniversityField({ type: "SET_VALUE", value })
            }
            errorMessage={universityField.errorMessage}
            clearError={() => dispatchUniversityField({ type: "CLEAR_ERROR" })}
            hasError={universityField.hasError}
          />

          {/* Year of Study */}
          <TextInput
            label="Current Year of Study"
            placeholder="e.g. 2nd Year"
            value={yearOfStudyField.value}
            onChange={(value: string) =>
              dispatchYearOfStudyField({ type: "SET_VALUE", value })
            }
            errorMessage={yearOfStudyField.errorMessage}
            clearError={() => dispatchYearOfStudyField({ type: "CLEAR_ERROR" })}
            hasError={yearOfStudyField.hasError}
          />

          {/* Field of Study */}
          <TextInput
            label="Field of Study"
            placeholder="e.g. Computer Science"
            value={fieldOfStudyField.value}
            onChange={(value: string) =>
              dispatchFieldOfStudyField({ type: "SET_VALUE", value })
            }
            errorMessage={fieldOfStudyField.errorMessage}
            clearError={() =>
              dispatchFieldOfStudyField({ type: "CLEAR_ERROR" })
            }
            hasError={fieldOfStudyField.hasError}
          />

          {/* Expected Graduation Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Expected Graduation Date
            </label>
            <input
              type="date"
              value={graduationDateField.value}
              onChange={(e) =>
                dispatchGraduationDateField({
                  type: "SET_VALUE",
                  value: e.target.value,
                })
              }
              onBlur={() =>
                dispatchGraduationDateField({ type: "CLEAR_ERROR" })
              }
              className={`border rounded-lg p-2 ${
                graduationDateField.hasError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {graduationDateField.hasError && (
              <span className="text-sm text-red-500">
                {graduationDateField.errorMessage}
              </span>
            )}
          </div>

          {/* Study Mode */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Study Mode
            </label>
            <select
              value={studyModeField.value}
              onChange={(e) =>
                dispatchStudyModeField({
                  type: "SET_VALUE",
                  value: e.target.value,
                })
              }
              onBlur={() => dispatchStudyModeField({ type: "CLEAR_ERROR" })}
              className={`border rounded-lg p-2 ${
                studyModeField.hasError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Mode</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Distance Learning">Distance Learning</option>
            </select>
            {studyModeField.hasError && (
              <span className="text-sm text-red-500">
                {studyModeField.errorMessage}
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
