<template>
    <div class="tiptap-editor-container">
        <div class="tiptap-editor-menu">
            <EditorMenuBar :editor="editor" v-slot="{ commands, isActive }">
                <div class="tiptap-icons">
                    <span class="tiptap-icon-container" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                        <BoldIcon />
                    </span>
                    <span class="tiptap-icon-container" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                        <ItalicIcon />
                    </span>
                    <span class="tiptap-icon-container" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                        <UnderlineIcon />
                    </span>
                    <TipTapSeparator />
                    <span class="tiptap-icon-container" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
                        <HeadingIcon width="16" height="16" />
                        <sub>2</sub>
                    </span>
                    <span class="tiptap-icon-container" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
                        <HeadingIcon width="16" height="16" />
                        <sub>3</sub>
                    </span>
                    <TipTapSeparator />
                </div>
            </EditorMenuBar>
        </div>
        <EditorContent class="tiptap-editor-content" :editor="editor" />
    </div>
</template>

<script>
    import BoldIcon from '@/assets/icons/bold.svg';
    import ItalicIcon from '@/assets/icons/italic.svg';
    import UnderlineIcon from '@/assets/icons/underline.svg';
    import HeadingIcon from '@/assets/icons/heading.svg';

    import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
    import TipTapSeparator from '@/components/tiptap-editor/TipTapSeparator.vue';

    import {
        Bold,
        Italic,
        Underline,
        Heading,

        Blockquote,
        CodeBlock,
        HardBreak,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Code,
        Link,
        Strike,
        History,
    } from 'tiptap-extensions'

    export default {
        name: 'TipTapEditorComponent',

        props: [ 'editor' ],

        components: {
            EditorContent,
            EditorMenuBar,
            BoldIcon,
            ItalicIcon,
            UnderlineIcon,
            HeadingIcon,
            TipTapSeparator,
        },

        beforeDestroy() {
            this.editor.destroy();
        },
    }
</script>

<style lang="scss">
    .textbox-wide {
        width: 100%;
    }

    .tiptap-editor-container {
        margin-bottom: 1rem;
        background-color: theme(white);
        border: 1px solid theme(primary);
        border-radius: layout(border-radius);
        overflow: hidden;

        .tiptap-editor-content {
            padding: 0 1rem;
        }

        .tiptap-editor-menu {
            background-color: theme(primary-light);
            border-bottom: 1px solid theme(primary);

            .tiptap-icons {
                display: flex;

                & > * {
                    flex: 0 0 auto;
                }
            }
        }

        .tiptap-icon-container {
            padding: 0 0.5rem;
            cursor: pointer;
            border-bottom: 2px solid transparent;

            &.is-active {
                border-color: theme(primary);
            }

            svg {
                vertical-align: middle;
            }
        }
    }
</style>
