"use client";

import Image from "next/image";
import { FormStep } from "./components/FormStep";
import { Sidebar } from "./components/Sidebar";
import { FormProvider } from "./contexts/form";
import { FormStepProvider } from "./contexts/form-step";

export default function Home() {
  return (
    <FormStepProvider>
      <FormProvider>
        <div className="relative flex flex-col h-screen">
          {/* Logo in top-right corner */}
          <div className="absolute top-4 right-4 z-10">
            <Image src="/logo-2.png" alt="Logo" width={60} height={60} />
          </div>

          <main
            className={`
              flex flex-col h-full m-0
              sm:flex-row sm:m-4 sm:mr-0 sm:h-[calc(100vh-32px)]
            `}
          >
            <Sidebar />
            <div className="flex flex-1 sm:max-w-[550px] sm:flex-0 sm:mx-auto">
              <FormStep />
            </div>
          </main>
        </div>
      </FormProvider>
    </FormStepProvider>
  );
}
