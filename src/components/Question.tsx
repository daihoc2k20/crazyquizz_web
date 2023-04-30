import { Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useQuestions } from "../hooks/useQuestions";
import { useMemo, useState } from "react";
import { HistoryModelUpdate } from "../models/user";

export function Exam({
  topicId,
  questionIDs,
  userAnswers,
  update,
}: {
  topicId: string;
  questionIDs: string[];
  userAnswers: string[];
  update: (history: Partial<HistoryModelUpdate>) => Promise<void>;
}) {
  const { questions } = useQuestions(topicId, questionIDs);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentQuestion = useMemo(
    () => questions[selectedQuestion] ?? questions[0],
    [questions, selectedQuestion]
  );

  function nextQuestion() {
    if (selectedQuestion < questions.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
    }
  }

  if (currentQuestion == undefined) {
    return <>loading...</>;
  }

  return (
    <div className="flex flex-col w-[500px]">
      <div className="flex items-center justify-between h-[40px]">
        <div></div>
        <Text fontWeight={700} fontSize="1.4em">
          Câu {selectedQuestion + 1}
        </Text>
        <Button
          onClick={() => nextQuestion()}
          isDisabled={
            loading ||
            selectedQuestion >= questions.length - 1 ||
            !userAnswers[selectedQuestion]
          }
        >
          <FaArrowRight />
        </Button>
      </div>
      <div className="w-full font-[500] text-[1.2em] text-start my-4">
        Câu hỏi: {currentQuestion.question}
      </div>
      <div>
        <RadioGroup
          key={currentQuestion.id}
          value={userAnswers[selectedQuestion] ?? "1"}
          onChange={(e) => {
            console.log(e);
            const newList = userAnswers.map((answer) =>
              answer ? answer : null
            );
            newList[selectedQuestion] = e;
            setLoading(true);

            update({
              userAnswers: newList as string[],
            }).then(() => setLoading(false));
          }}
        >
          <Stack>
            <Radio value="1" isDisabled display="none">
              Checked
            </Radio>
            {Object.keys(currentQuestion.options)
              .sort()
              .map((key, index) => {
                return (
                  <Radio
                    value={key}
                    key={`${currentQuestion.question}-${index}`}
                  >{`${key}: ${currentQuestion.options[key as "A"]}`}</Radio>
                );
              })}
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
}
