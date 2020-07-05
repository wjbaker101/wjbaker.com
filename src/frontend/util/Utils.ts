export const Utils = {

    updateTitle(title: string | null): void {
        if (title === null) {
            document.title = 'wjbaker.com';
            return;
        }

        document.title = `${title} | wjbaker.com`;
    },

    updateDescription(_description: string | null): void {
        const tag = document.querySelector('head meta[name="description"]');

        const description = (_description === null) ? '' : _description;

        if (tag === null) {
            const newTag = document.createElement('meta');
            newTag.setAttribute('name', 'description');
            newTag.setAttribute('content', description);

            document.querySelector('head')?.appendChild(newTag);

            return;
        }

        tag.setAttribute('content', description);
    },
}
