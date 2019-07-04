const isAlphanumeric = (charCode) => {
    if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
        !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
        !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
      return false;
    }
    return true;
};

class TitleParser {

    getTitleURL(title) {
        let currentTitleURL = '';

        for (let i = 0; i < title.length; ++i) {
            const isCharacterAllowed = isAlphanumeric(title.charCodeAt(i));

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

        return currentTitleURL.toLowerCase();
    }
}

module.exports = new TitleParser();