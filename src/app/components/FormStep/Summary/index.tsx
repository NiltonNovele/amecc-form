import { Fragment, useEffect, useState } from "react";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import { Footer } from "../../Footer";
import Form from "../../Form";

export function Summary() {
  const [submitted, setSubmitted] = useState(false);

  const { handlePreviousStep } = useFormStep();
  const {
    nameField,
    emailField,
    phoneNumberField,
    addressField,
    passportNumberField,
    genderField,
    universityField,
    yearOfStudyField,
    fieldOfStudyField,
    graduationDateField,
    studyModeField,
    addOns,
    clearForm,
  } = useForm();

  // ✅ Insert handleSubmitForm here
  async function handleSubmitForm() {
    const formData = {
      personalInfo: {
        name: nameField.value,
        email: emailField.value,
        phoneNumber: phoneNumberField.value,
        address: addressField.value,
        passportNumber: passportNumberField.value,
        gender: genderField.value,
      },
      educationInfo: {
        university: universityField.value,
        yearOfStudy: yearOfStudyField.value,
        fieldOfStudy: fieldOfStudyField.value,
        graduationDate: graduationDateField.value,
        studyMode: studyModeField.value,
      },
      addOns,
      submittedAt: new Date(),
    };

    await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      clearForm();
    }
  }, [submitted, clearForm]);

  if (submitted) {
    return (
      <Form.Card>
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-denim mb-4">Thank You!</h2>
          <p className="text-gray-700 mb-6">
            Your submission has been received successfully.
          </p>
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Join Our WhatsApp Group
          </a>

          <a
            href="https://amecc.site"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Return Home
          </a>
        </div>
      </Form.Card>
    );
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Final Submission"
          description="Double-check all your information before submitting your form."
        />
        <p className="mt-5 text-gray-700">
          Once you submit, you won't be able to make changes, so make sure all
          your details are correct.
        </p>
      </Form.Card>

      <Footer
        handleGoForwardStep={handleSubmitForm}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
