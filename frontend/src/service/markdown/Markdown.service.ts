import MarkdownIt from 'markdown-it';
import externalLinks from 'markdown-it-external-links';
import highlightJs from 'highlight.js';

class MarkdownService {

    private parser: MarkdownIt;

    constructor() {
        this.parser = new MarkdownIt({
            highlight(text, language): string {
                if (!highlightJs.getLanguage(language))
                    return '';

                try {
                    return highlightJs.highlight(text, { language }).value;
                }
                catch (_) {
                    return '';
                }
            },
        });

        this.parser.use(externalLinks, {
            internalDomains: [
                'wjbaker.com'
            ],
            externalClassName: 'link-component',
            internalClassName: 'link-component',
            externalTarget: '_blank',
            externalRel: 'noopener noreferrer',
        });
    }

    public parse(text: string): string {
        return this.parser.render(text);
    }
}

export const markdownService = new MarkdownService();