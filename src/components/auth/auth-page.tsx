"use client";

import Silk from "@/components/bgs/Silk";
import { ReactNode } from "react";

interface AuthPageComponentProps {
  form: ReactNode;
  bg?: ReactNode;
}

export const FORM_CLASSNAME =
  "glass flex w-full max-w-xl min-w-3xs flex-col items-center gap-3 rounded-4xl md:rounded-none p-4 md:justify-center md:p-4 md:border-none";

export const AuthPageComponent = ({
  form,
  bg = (
    <Silk
      speed={3.6}
      scale={0.7}
      color="#bb4d00"
      noiseIntensity={1.3}
      rotation={0}
    />
  ),
}: AuthPageComponentProps) => {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10 mx-2 flex min-h-screen items-center justify-center md:mx-0 md:items-stretch md:justify-start">
        {form}
      </div>
      <div className="fixed inset-0 -z-10">{bg}</div>
    </main>
  );
};
