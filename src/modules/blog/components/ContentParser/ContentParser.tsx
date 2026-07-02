import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

const ContentParser = ({ content }: { content: Record<string, unknown> }) => {
  const html = generateHTML(content, [
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          class: 'tiptap-heading'
        }
      },
      link: {
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline'
        }
      },
      paragraph: {
        HTMLAttributes: {
          class: 'py-4'
        }
      },
      orderedList: {
        HTMLAttributes: {
          class: 'editor-ordered-list'
        },
        itemTypeName: 'listItem',
        keepMarks: true,
        keepAttributes: true
      }
    }) as any,
    Image,
    TextStyle.configure({
      HTMLAttributes: {
        class: 'editor-text-style'
      }
    }),
    Color.configure({
      types: ['textStyle']
    }),
    TextAlign,
    Highlight.configure({
      HTMLAttributes: {
        class: 'bg-[#ffff00] text-inherit'
      }
    }),
    Typography
  ]);
  return (
    <div
      className="content py-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ContentParser;
