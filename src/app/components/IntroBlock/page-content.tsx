import './styles.css';

import { Locale } from '~/i18n.config';

type PageContent = {
  lang: Locale;
  children?: React.ReactNode;
};

export const PageContent: React.FC<PageContent> = ({
  lang = 'en',
  children,
}) => {
  return <div className="page-content">{children}</div>;
};
