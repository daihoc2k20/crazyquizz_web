import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useQuestions } from "../hooks/useQuestions";
import { useMemo, useRef, useState } from "react";
import { HistoryModelUpdate } from "../models/user";
import { Timer } from "./Timer";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateUserTopic } from "../lib/updateUserTopic";

export function Exam({
  topicId,
  questionIDs,
  userAnswers,
  update,
  time,
  testId,
  userId,
}: {
  userId: string;
  topicId: string;
  testId: string;
  questionIDs: string[];
  userAnswers: string[];
  update: (history: Partial<HistoryModelUpdate>) => Promise<void>;
  time: {
    from: Timestamp;
    to: Timestamp;
  };
}) {
  const { questions } = useQuestions(topicId, questionIDs);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigator = useNavigate();

  const currentQuestion = useMemo(
    () => questions[selectedQuestion] ?? questions[0],
    [questions, selectedQuestion]
  );

  function nextQuestion() {
    if (selectedQuestion < questions.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
    } else {
      onOpen();
    }
  }

  async function submit(currentTime?: Timestamp) {
    if (Array.isArray(questions) && questions.length > 0) {
      const list: string[] = [];
      const score = questions.reduce((prev, current, index) => {
        if (current.answer == userAnswers[index]) {
          list.push(current.id);
          return prev + 1;
        }

        return prev;
      }, 0);

      console.log("score", score);
      setIsSubmiting(true);
      if (currentTime) {
        await update({
          score,
          submited: true,
          endedAt: currentTime,
        });
      } else {
        await update({
          score,
          submited: true,
        });
      }
      await updateUserTopic(userId, topicId, list);
      navigator(`/complete/${testId}`);
      setIsSubmiting(false);
    }
  }

  console.log(selectedQuestion, topicId, questionIDs);

  if (currentQuestion == undefined) {
    return <>loading...</>;
  }

  return (
    <div className="flex flex-col w-[500px]">
      <Timer from={time.from} to={time.to} onDone={submit} />
      <div className="flex items-center justify-between h-[40px]">
        <div></div>
        <Text fontWeight={700} fontSize="1.4em">
          Câu {selectedQuestion + 1}
        </Text>
        <Button
          onClick={() => nextQuestion()}
          isDisabled={loading || !userAnswers[selectedQuestion]}
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Nộp bài
            </AlertDialogHeader>

            <AlertDialogBody>Bạn có chắc chắn muốn nộp bài</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  submit(Timestamp.now()).finally(() => {
                    onClose();
                  });
                }}
                ml={3}
                isDisabled={isSubmiting}
              >
                Nộp bài
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      ;
    </div>
  );
}
