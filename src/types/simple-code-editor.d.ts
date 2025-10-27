declare module 'simple-code-editor' {
  import { DefineComponent } from 'vue'

  interface CodeEditorProps {
    modelValue?: string
    languages?: Array<[string, string]>
    highlight?: any
  }

  const CodeEditor: DefineComponent<CodeEditorProps>
  export default CodeEditor
}
