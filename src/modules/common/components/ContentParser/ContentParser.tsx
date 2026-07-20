'use client';

import { Mark, mergeAttributes, Node } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle']
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize?.replace('px', ''),
        renderHTML: attributes => {
          if (!attributes.size) return {};
          return {
            style: `font-size: ${attributes.size}px`,
            class: 'custom-font-size'
          };
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        style: 'font-size',
        getAttrs: value => {
          if (!value) return false;
          return {
            size: value.replace('px', '')
          };
        }
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    if (!HTMLAttributes.size) return ['span', 0];
    return ['span', mergeAttributes(HTMLAttributes), 0];
  }
});
const Iframe = Youtube.extend({
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attrs => ({ src: attrs.src })
      },
      class: {
        default: 'w-full aspect-video',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: () => ({ class: 'w-full aspect-video' })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'iframe'
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  }
});
const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attrs => ({ src: attrs.src })
      },
      alt: {
        default: null,
        parseHTML: element => element.getAttribute('alt'),
        renderHTML: attrs => ({ alt: attrs.alt })
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('title'),
        renderHTML: attrs => ({ title: attrs.title })
      },
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attrs => {
          if (!attrs.width) {
            return {};
          }
          return { width: String(attrs.width).replace('%', '') };
        }
      },

      class: {
        default: 'content-image',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: () => ({ class: 'content-image p-4 my-2' })
      }
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      {
        ...HTMLAttributes,
        draggable: false
      }
    ];
  },

  group: 'inline',
  inline: true,
  draggable: true,
  selectable: true
});
const ContentParser = ({ content }: { content: Record<string, unknown> | string | null | undefined }) => {
  let html = '';

  if (typeof content === 'string') {
    html = content;
  } else if (content) {
    try {
    html = generateHTML(content, [
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
          class: 'py-2'
        }
      },
      orderedList: {
        HTMLAttributes: {
          class: 'editor-ordered-list'
        },
        itemTypeName: 'listItem'
        // keepMarks: true,
        // keepAttributes: true
      }
    }) as any,
    FontSize,
    Iframe,
    CustomImage.configure({
      inline: true,
      allowBase64: true
    }),
    TextStyle.configure({
      HTMLAttributes: {
        class: 'editor-text-style'
      }
    }),
    Color.configure({
      types: ['textStyle']
    }),
    TextAlign.configure({
      defaultAlignment: 'left',
      types: ['heading', 'paragraph', 'image']
    }),
    Highlight.configure({
      HTMLAttributes: {
        class: 'bg-[#ffff00] text-inherit'
      }
    }),
      Typography
      ]);
    } catch (error) {
      console.error('Unable to render resource content:', error);
    }
  }
  return (
    <div
      className="content py-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ContentParser;
