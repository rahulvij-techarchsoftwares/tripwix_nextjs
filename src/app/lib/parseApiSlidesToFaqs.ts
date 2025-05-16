export const parseApiSlidesToFaqs = (
  faqs: { question: string; answer: string }[]
) => {
  return (
    faqs.map(({ question, answer }, index) => ({
      id: index,
      question,
      answer,
    })) || []
  );
};
