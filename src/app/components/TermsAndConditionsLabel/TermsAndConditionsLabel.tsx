import Link from 'next/link';
import React from 'react';

import { PAGE_PATHS } from '~/lib/constants';

import { TermsAndConditionsLabelProps } from './types';

export const TermsAndConditionsLabel: React.FC<
  TermsAndConditionsLabelProps
> = ({ lang = 'en' }) => {
  return (
    <p className="text-xs">
      By submitting, you agree to be contacted by our Villa Specialists and
      accept our{' '}
      <Link
        target="_blank"
        href={`/${lang}/${PAGE_PATHS.TERMS_AND_CONDITIONS}/`}
        className="hover:text-success underline underline-offset-2"
      >
        Terms and Privacy Policy.
      </Link>
    </p>
  );
};
