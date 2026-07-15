import { DocumentText } from '@medusajs/icons';
import Link from 'next/link';

import { ProductFile } from '@/types/product';

export const ProductFiles = ({ files }: { files: ProductFile[] | undefined }) => {
  return (
    <div className="flex gap-x-4">
      {files &&
        files.length &&
        files.map(file => {
          return (
            <Link
              className="flex items-center gap-x-1 font-bold text-black"
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DocumentText
                color="rgb(234, 179, 8)"
                width={26}
                height={26}
              />
              {file.type}
            </Link>
          );
        })}
    </div>
  );
};
