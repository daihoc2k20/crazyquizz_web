import { ReactNode } from "react";

interface BuilderProps {
  children: ReactNode;
  isLoading: boolean;
  fallback?: ReactNode;
}

export const Builder: React.FC<BuilderProps> = ({
  children,
  isLoading,
  fallback,
}) => {
  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
