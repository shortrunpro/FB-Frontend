import { DocumentText } from '@medusajs/icons';
import Link from 'next/link';
import { LuFile, LuFileCog, LuFilePen, LuFileText } from 'react-icons/lu';

import { ProductFile } from '@/types/product';

export const ProductFiles = ({ files }: { files: ProductFile[] | ProductFile }) => {
  const fileArr = typeof files === 'object' ? ([files] as ProductFile[]) : (files as ProductFile[]);
  const fileIcon = (type: string) => {
    switch (type) {
      case 'Spec Sheet':
        return (
          <LuFileText
            color="rgb(234, 179, 8)"
            size={'1.25em'}
          />
        );
      case 'Installation Guide':
        return (
          <LuFileCog
            color="rgb(234, 179, 8)"
            size={'1.25em'}
          />
        );
      case 'CSI Specifications':
        return (
          <LuFilePen
            color="rgb(234, 179, 8)"
            size={'1.25em'}
          />
        );
      default:
        return (
          <LuFile
            color="rgb(234, 179, 8)"
            size={'1.25em'}
          />
        );
    }
  };
  return (
    <div className="flex gap-x-4">
      {fileArr &&
        fileArr.length &&
        fileArr.flat().map(file => {
          let icon = fileIcon(file.type);
          return (
            <Link
              className="flex items-center gap-x-1 font-bold text-black"
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
              {file.type}
            </Link>
          );
        })}
    </div>
  );
};
