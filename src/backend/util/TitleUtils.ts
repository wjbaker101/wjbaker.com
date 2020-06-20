export const TitleUtils = {

    isAlphanumeric(charCode: number): boolean {
        return (charCode > 47 && charCode < 58) // Numeric (0-9)
                || (charCode > 64 && charCode < 91) // Upper alpha (A-Z)
                || (charCode > 96 && charCode < 123); // Lower alpha (a-z)
    },

    dashifyTitle(title: string): string | Error {
        if (title.length === 0) {
            return new Error('Input title must not be empty.');
        }

        let currentTitleURL = '';

        for (let i = 0; i < title.length; ++i) {
            const isCharacterAllowed = this.isAlphanumeric(title.charCodeAt(i));

            if (isCharacterAllowed) {
                currentTitleURL += title.charAt(i);
            }
            else {
                if (currentTitleURL.length !== 0
                        && currentTitleURL
                                .charAt(currentTitleURL.length - 1) === '-') {

                    continue;
                }

                currentTitleURL += '-';
            }
        }

        while (currentTitleURL.endsWith('-')) {
            currentTitleURL=
                    currentTitleURL.substring(0, currentTitleURL.length - 1);
        }

        if (currentTitleURL.length === 0) {
            return new Error('Resultant title is empty.');
        }

        return currentTitleURL.toLowerCase();
    },
}
