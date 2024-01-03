import React from "react";

const AuthContainer: React.FC<{
  children: React.ReactNode;
  title: string;
  description?: string;
}> = ({ children, title, description }) => {
  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <h4 className="text-primary text-3xl font-bold">{title}</h4>
        <p className="text-secondary">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default AuthContainer;
