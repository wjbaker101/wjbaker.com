import MarkdownIt from 'markdown-it';
import externalLinks from 'markdown-it-external-links';

class MarkdownService {

    private parser: MarkdownIt;

    constructor() {
        this.parser = new MarkdownIt();
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