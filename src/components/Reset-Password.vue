<template>
 <div>
     <v-form v-model="isFormValid" ref="form">
        <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
            <v-card light flat tile min-height="200" min-width="800">
                <v-card-title>Reset Password</v-card-title>
                <v-card-subtitle class="pb-0">Enter your new password</v-card-subtitle>
                <v-card-text>
                <v-container class="pl-0 pb-0">
                    <v-row>
                    <v-col cols="4">
                        <v-text-field
                        dense
                        label="New Password"
                        @keyup.enter="resetPassword"
                        v-model="password"
                        :type="showPassword ? 'text': 'password'"
                        :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                        counter
                        @click:append="showPassword = !showPassword"
                        :rules="[rules.required, rules.minimumLength, rules.password]"
                        ></v-text-field>
                    </v-col>
                    </v-row>

                    <v-row>
                    <v-col class="pt-0" cols="4">
                        <v-text-field
                        dense
                        label="Confirm Password"
                        @keyup.enter="resetPassword"
                        v-model="confirmPassword"
                        counter
                        :rules="[rules.required, rules.confirmPassword]"
                        type="password"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>

                <v-btn tile depressed small dark color="#1976d2" @click="resetPassword" :disabled="!isFormValid">Reset Password</v-btn>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
        </v-container>
     </v-form>
  </div>
</template>

<script>
import rulesMixins from '../mixins/rules.mixins';

export default {
    name: 'ResetPassword',
    mixins: [rulesMixins],
    data() {
        return {
            confirmPassword: '',
            showPassword: false,
            isFormValid: false,
        }
    },
    methods: {
        resetPassword() {
            return; // TODO
        }
    }
}
</script>

<style>

</style>