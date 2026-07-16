'use client';

import { FilterInterface, Interweave, Node } from 'interweave';

export const ProductPageDetails = ({ details }: { details: any }) => {
  const description: string = details?.description;
  const frame = description.slice(description.indexOf('<iframe'));
  if (!details) return null;
  function transform(node: HTMLElement, children: Node[]): React.ReactNode {
    if (node.tagName === 'IFRAME') {
      return (
        <iframe
          className="aspect-video w-full pb-4"
          src={node.getAttribute('src') ?? undefined}
        >
          {children}
        </iframe>
      );
    }
  }
  return (
    <div className="px-8">
      <div className="px-8 py-4">
        <ul className="flex gap-x-2 text-brand">
          <li className="rounded-md bg-brand px-2 text-white">Overview</li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Specs
          </li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Video
          </li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Q&A
          </li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Reviews
          </li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Documents
          </li>
          <li className="rounded-md px-2 hover:cursor-pointer hover:bg-brand hover:text-white">
            Related Products
          </li>
        </ul>
      </div>
      <h3 className="text-3xl">{details?.title}</h3>
      <div className="flex w-full justify-center py-4">
        <div className="flex w-1/3 flex-col justify-center gap-y-4">
          <Interweave
            transform={transform}
            // filters={[filter]}
            allowList={['iframe']}
            content={frame}
          />
        </div>
        <div className="flex w-2/3 justify-center">
          <Interweave
            className="flex w-3/4 flex-col"
            content={details?.description}
          />
        </div>
      </div>
    </div>
  );
};
