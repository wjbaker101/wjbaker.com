export default {

    props: [ 'page' ],

    /**
     * Called when the component is shown onto the webpage. It will emit
     * and event, which will tell the rest of the app which page is currently
     * being shown.
     */
    created() {
        this.$emit('navpageinit', this.page);
    },
}