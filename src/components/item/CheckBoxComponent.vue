<template>
    <div class="checkbox-container">
        <label>{{ label }}</label>
        <input :id="id" class="checkbox-input" type="checkbox" :value="val" v-model="checked" @change="onChange">
        <label :for="id">
            <span class="checkbox-tick"></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'CheckBoxComponent',

        props: [ 'id', 'label', 'val', 'value' ],

        data() {
            return {
                checkedProxy: false,
            }
        },

        computed: {
	        checked: {
                get() {
                    return this.value;
                },

                set(value) {
                    this.checkedProxy = value;
                },
            }
        },

        methods: {
            onChange: function(e) {
                this.$emit('input', this.checkedProxy);
            },
        },
    }
</script>

<style lang="scss">
    .checkbox-container {
        & > * {
            vertical-align: middle;
        }

        label + .checkbox-input + label {
            margin-left: 0.5rem;
        }
    }

    .checkbox-input {
        display: none;
    }

    .checkbox-input {
        & + label {
            $size: 1.25rem;
            width: $size;
            height: $size;
            position: relative;
            display: inline-block;
            border: 2px solid theme(primary);
            background-color: theme(white);
            border-radius: layout(border-radius);
            cursor: pointer;
            transition: background-color 0.2s;

            .checkbox-tick {
                width: 0.65rem;
                height: 0.4rem;
                position: absolute;
                top: 3px;
                left: 3px;
                display: inline-block;
                border-left: 2px solid theme(white);
                border-bottom: 2px solid theme(white);
                transform: rotate(-45deg);
                opacity: 0;
                transition: opacity 0.4s;
            }
        }

        &:checked + label {
            border: 2px solid theme(primary-dark);
            background-color: theme(primary);

            .checkbox-tick {
                opacity: 1;
            }
        }
    }
</style>
