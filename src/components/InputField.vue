<template>
    <q-input
        bg-color="white"
        filled
        :label="labelling"
        lazy-rules
        :rules="[
          (val) =>
          (val !== null && val !== '') || 'This field is required',
        ]"
    />
</template>

<script>
    import { colors } from 'quasar';
import { defineComponent } from 'vue'
    
    export default defineComponent({
      name: 'InputField',
      props: {
        labelling: {
          type: String,
          required: true,
          default: ""
        },
      }
    })
</script>