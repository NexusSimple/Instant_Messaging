"use client";

import { useState } from "react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  return <div>AuthForm</div>;
};

export default AuthForm;
