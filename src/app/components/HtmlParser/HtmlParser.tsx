import React from 'react';

interface IHtmlParserProps {
  htmlContent?: string;
  breakLines?: boolean;
}

// TODO: Sanitize HTML, dompurify & isomorphic-dompurify at the moment are not compatible with serve-components
export const HtmlParser: React.FC<IHtmlParserProps> = ({
  htmlContent = '',
  breakLines = false,
}) => {
  const htmlWithBreakLines = htmlContent.replace(/\n/g, '<br />');
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: breakLines ? htmlWithBreakLines : htmlContent,
      }}
    />
  );
};
