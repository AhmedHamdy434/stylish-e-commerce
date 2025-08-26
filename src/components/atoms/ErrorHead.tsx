const ErrorHead = ({ message }: { message: string }) => {
  return message && <h6 className="text-destructive text-xs">{message}</h6>;
};

export default ErrorHead;
