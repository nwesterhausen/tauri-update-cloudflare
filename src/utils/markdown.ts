import { marked } from 'marked';

// &#63; to ? helper
const htmlEscapeToText = (text: string) => {
  return text.replace(/&#[0-9]*;|&amp;/g, (escapeCode) => {
    if (escapeCode.match(/amp/)) {
      return '&';
    }
    const match = escapeCode.match(/[0-9]+/);
    if (match !== null) {
      return String.fromCharCode(parseInt(match[0]));
    }
    return '';
  });
};
const renderPlain = () => {
  const render = new marked.Renderer();
  // render just the text of a link
  render.link = function (href, title, text) {
    return text;
  };
  // render just the text of a paragraph
  render.paragraph = function (text) {
    return htmlEscapeToText(text) + '\r\n';
  };
  // render just the text of a heading element, but indecate level
  render.heading = function (text, level) {
    return level + ' ) ' + text;
  };
  // render nothing for images
  render.image = function (href, title, text) {
    return '';
  };
  // render lists?
  render.list = function (text, ordered, start) {
    return '';
  }
  render.listitem = function(text, task, checked) {
    return `   ${text}\r\n`;
  }
  return render;
};

export const MarkdownToPlain = (markdown: string): string => {
  return marked(markdown, {
    renderer: renderPlain(),
  });
};
