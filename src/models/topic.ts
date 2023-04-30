interface TopicModel {
  id: string;
  name: string;
}

interface QuestionModel {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
}
