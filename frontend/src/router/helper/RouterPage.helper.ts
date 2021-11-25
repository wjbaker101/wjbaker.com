class RouterPageHelper {

    setTitle(title: string | null) {
        if (title === null) {
            document.title = 'wjbaker.com';
            return;
        }

        document.title = `${title} | wjbaker.com`;
    }

    setDescription(description: string | null) {
        const tag = document.querySelector('head meta[name="description"]');

        const displayDescription = description ?? '';

        if (tag === null) {
            const newTag = document.createElement('meta');
            newTag.setAttribute('name', 'description');
            newTag.setAttribute('content', displayDescription);

            document.querySelector('head')?.appendChild(newTag);

            return;
        }

        tag.setAttribute('content', displayDescription);
    }
}

export const routerPageHelper = new RouterPageHelper();