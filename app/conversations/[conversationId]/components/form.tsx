"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Set the message input field to emtpy when the user has submitted the message.
    setValue("message", "", { shouldValidate: true });

    // Make a POST request to the following endpoint
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };
  return <div>Form</div>;
};

export default Form;
