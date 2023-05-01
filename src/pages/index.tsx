import { Button, Select } from "@chakra-ui/react";
import { useTopics } from "../hooks/useTopics";
import { useUser } from "../hooks/useUser";
import { useEffect, useMemo, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { useTest } from "../hooks/useTest";
import { Exam } from "../components/Exam";

export function Home() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [limitQuestion, setLimitQuestion] = useState(5);
  const { user } = useUser();
  const { test, create: createTest, update: updateTest } = useTest(user?.id);

  const [creatingTest, setCreatingTest] = useState(false);

  const [topics] = useTopics(user?.id);

  useEffect(() => {
    console.log("test", test);
  }, [test]);

  const renderTopics = useMemo(
    () =>
      topics.map((topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.name}
        </option>
      )),
    [topics]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <Select
          minW={150}
          placeholder="Select a topic"
          value={test ? test.topicID : selectedTopic}
          isDisabled={!!test}
          onChange={(e) => {
            console.log(e);
            setSelectedTopic(e.currentTarget.value);
          }}
        >
          {renderTopics}
        </Select>
        <div className="w-5"></div>
        <Select
          value={test ? test.questionIDs.length : limitQuestion}
          isDisabled={!!test}
          onChange={(e) => setLimitQuestion(+e.currentTarget.value)}
        >
          <option value={5}>5 câu</option>
          <option value={10}>10 câu</option>
          <option value={15}>15 câu</option>
          <option value={20}>20 câu</option>
        </Select>
        <div className="w-5"></div>
        <Button
          colorScheme="cyan"
          p={0}
          color="white"
          isLoading={creatingTest}
          isDisabled={!!test}
          onClick={() => {
            if (!test && selectedTopic) {
              setCreatingTest(true);
              createTest(selectedTopic, limitQuestion).finally(() => {
                setCreatingTest(false);
              });
            }
          }}
        >
          <IoPlay />
        </Button>
      </div>
      <div>
        {test && Array.isArray(test?.questionIDs) && (
          <Exam
            topicId={test.topicID}
            testId={test.id}
            questionIDs={test.questionIDs}
            userAnswers={test.userAnswers}
            update={updateTest}
            time={{
              from: test.createdAt,
              to: test.endedAt,
            }}
          />
        )}
      </div>
    </div>
  );
}
