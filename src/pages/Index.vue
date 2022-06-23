<template>
  <q-page class="flex flex-center">
    <q-card class="my-card bg-secondary" style="width: 500px">
      <q-card-section>
        <div class="q-my-md text-h4 text-center text-headingcolour">Welcome back</div>
        <div class="q-pa-md">

          <div style="width: 100%">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input bg-color="white" filled v-model="email" label="Email *" lazy-rules
                :rules="[val => val !== null && val !== '' || 'This field is required']" />

              <q-input bg-color="white" filled type="password" v-model="password" label="Password *" />
              
              <div id="hover" class="text-right text-caption cursor-pointer" @click="$router.push('/forgot-password')">
                Forgot password?
              </div>

              <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

              <div class="flex flex-center">
                <q-btn color="loginbtn" text-color="loginbtn" label="Login" type="submit" @click="$router.push('/homepage')"/>
                <!-- <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
              </div>
            </q-form>

          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue';

// export default defineComponent({
//   name: 'PageIndex'
// })


import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup() {
    const $q = useQuasar()

    const email = ref(null)
    const password = ref(null)
    const accept = ref(false)

    return {
      email,
      password,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      }
    }
  }
}

</script>
