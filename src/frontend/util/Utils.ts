export const Utils = {

    updateTitle(title: string | null): void {
        if (title === null) {
            document.title = 'wjbaker.com';
            return;
        }

        document.title = `${title} | wjbaker.com`;
    },
}
