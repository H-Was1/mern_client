import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-500 mb-4 text-center">{message}</div>;
};

export default ErrorMessage;
