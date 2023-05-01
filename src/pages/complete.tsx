import { Button } from "@chakra-ui/react";
import { useLatestTest } from "../hooks/useTest";
import { useUser } from "../hooks/useUser";
import { Link, useParams } from "react-router-dom";

export function Complete() {
  const { user } = useUser();
  const { testid } = useParams();
  const { test } = useLatestTest(user?.id ?? "", testid ?? "");

  if (!test) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        Điểm số của bạn là {test?.score}/{test?.questionIDs?.length}
      </div>
      <div>
        <Link to="/">
          <Button colorScheme="cyan" color="white">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
