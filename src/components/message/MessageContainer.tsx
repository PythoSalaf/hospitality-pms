export const MessageContainer: React.FC<{
  icon: React.ReactNode;
  message?: string | React.ReactNode;
}> = ({ icon, message }) => {
  return (
    <div className="flex flex-col items-center gap-y-5">
      {icon}
      {message}
    </div>
  );
};
