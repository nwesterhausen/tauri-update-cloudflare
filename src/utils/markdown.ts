import { marked } from 'marked';

// &#63; to ? helper
const htmlEscapeToText = (text: string) => {
    return text.replace(/\&\#[0-9]*;|&amp;/g, (escapeCode) => {
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
    // render just the text of a heading element
    render.heading = function (text, level) {
        return `\r\n${text}\r\n`;
    };
    // render nothing for images
    render.image = function (href, title, text) {
        return '';
    };
    // render lists?
    render.list = function (text, ordered, start) {
        return text;
    }
    render.listitem = function (text, task, checked) {
        return `   ${htmlEscapeToText(text)}\r\n`;
    }
    return render;
};

export const MarkdownToPlain = (markdown: string): string => {
    return marked(markdown, {
        renderer: renderPlain(),
    });
};

// const testStr = "## [0.5.0](https://github.com/nwesterhausen/overseers-manual-df/compare/v0.4.1...v0.5.0) (2022-06-10)\n\n\n### Features\n\n* ✨ badges for flier, intelligent and gnawer ([2015174](https://github.com/nwesterhausen/overseers-manual-df/commit/201517497270563ed065a1e9f2889f84979a235f))\n* ✨ display creature activity and trainability ([ce94d78](https://github.com/nwesterhausen/overseers-manual-df/commit/ce94d78287cec536e84c214111fa456527428c22))\n* ✨ display creature classes ([f9e9976](https://github.com/nwesterhausen/overseers-manual-df/commit/f9e997630e067b39cfcd62080940b85383367dbe))\n* ✨ send more data about creatures to frontend ([d396fa7](https://github.com/nwesterhausen/overseers-manual-df/commit/d396fa79080fb46ea355a93aa43c80c235ece339))\n\n\n### Bug Fixes\n\n* ⚡️ don't send extra names ([a68e1d2](https://github.com/nwesterhausen/overseers-manual-df/commit/a68e1d2c3493ad831508d65df19d8db6f6937b22))\n* 💄 remove margins on name table ([1281111](https://github.com/nwesterhausen/overseers-manual-df/commit/128111183762d6d8c2129a92d0ba56b5575aacd7))\n\n";

// console.log(MarkdownToPlain(testStr));