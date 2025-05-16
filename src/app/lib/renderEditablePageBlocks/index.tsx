import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';

import { AdaptersManager } from './adaptersManager';

function renderBlock({ slug, data }: any): React.ReactNode {
  const createBlock = AdaptersManager[slug];
  if (!createBlock) {
    return (
      <Container variant={ContainerVariant.Default}>
        <div className="border border-[#f5c6cb] rounded-xl text-center p-6 bg-[#f8d7da] text-[#721c24]">
          <p>The slug: {slug}, is not configured</p>
        </div>
      </Container>
    );
  }

  return createBlock(data);
}

export const renderEditablePageBlocks = (components: any[]) => {
  return components.map((component, index) => (
    <React.Fragment key={index}>{renderBlock(component)}</React.Fragment>
  ));
};
