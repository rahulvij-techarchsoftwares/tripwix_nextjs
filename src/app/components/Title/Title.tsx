import React from 'react';

import { TitleProps, TitleVariants } from './types';

export const Title: React.FC<TitleProps> = ({
  children,
  extraClasses = '',
  titleVariant,
}) => {
  switch (titleVariant) {
    case TitleVariants.H1:
      return <h1 className={`${extraClasses}`}>{children}</h1>;
    case TitleVariants.H2:
      return <h2 className={`${extraClasses}`}>{children}</h2>;
    case TitleVariants.H3:
      return <h3 className={`${extraClasses}`}>{children}</h3>;
    case TitleVariants.H4:
      return <h4 className={`${extraClasses}`}>{children}</h4>;
    case TitleVariants.H5:
      return <h5 className={`${extraClasses}`}>{children}</h5>;
    case TitleVariants.H6:
      return <h6 className={`${extraClasses}`}>{children}</h6>;
    case TitleVariants.P:
      return <p className={`${extraClasses}`}>{children}</p>;
    default:
      return <h1 className={`${extraClasses}`}>{children}</h1>;
  }
};
