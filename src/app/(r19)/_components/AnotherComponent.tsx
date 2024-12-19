"use client";

import { useFormStatus } from "react-dom";

export function AnotherComponent() {
  const { pending } = useFormStatus();
  return <>{pending ? <h1>Pending...</h1> : <h1>Ready to submit</h1>}</>;
}
