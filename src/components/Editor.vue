<template>
  <div class="joker-component-editor">
    <quill-editor 
      :content="content" 
      @change="onEditorChange($event)" 
      ref="myQuillEditor"></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  props:['content'],
  data() {
    return {
    };
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.$emit('update',html);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
};
</script>

<style>

</style>