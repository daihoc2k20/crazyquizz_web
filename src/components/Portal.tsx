import { Box } from "@chakra-ui/react";
import { Fragment, ReactNode, useCallback, useId, useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  target?: Element;
}

export function Portal({ children, target }: PortalProps) {
  const portalId = useId();
  const create = useCallback(
    (children: ReactNode) => {
      const targetElement = target ?? document.body;
      return createPortal(children, targetElement);
    },
    [target]
  );

  const renderChild = useMemo(
    () =>
      create(
        <Box
          className="portal"
          id={`portal${portalId}`}
          css={{ position: "fixed" }}
        >
          {children}
        </Box>
      ),
    [children, create, portalId]
  );

  return <Fragment>{renderChild}</Fragment>;
}
