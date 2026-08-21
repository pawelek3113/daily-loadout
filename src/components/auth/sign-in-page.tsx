"use client";

import Silk from "@/components/bgs/Silk";
import { SignInForm } from "./sign-in-form";

export const SignInPageComponent = () => {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10 mx-2 flex min-h-screen items-center justify-center md:items-stretch md:justify-start">
        <SignInForm className="my-2 max-w-xl min-w-3xs" />
      </div>
      <div className="fixed inset-0 -z-10">
        <Silk
          speed={3.6}
          scale={0.7}
          color="#bb4d00"
          noiseIntensity={1.3}
          rotation={0}
        />
      </div>
    </main>
  );
};
