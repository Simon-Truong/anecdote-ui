export default {
    data() {
        return {
            password: '',
            rules: {
                required: value => !!value || 'Required',
                email: value => {
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return pattern.test(value) || 'Invalid e-mail';
                },
                minimumLength: value => value.length >= 8 || 'Password must be at least 8 characters long',
                password: value => {
                  const upperCasePattern = /[A-Z]/;
                  const lowerCasePattern = /[a-z]/;
                  const numberPattern = /[0-9]/;
                  const specialCharacterPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        
                  if (!upperCasePattern.test(value)) {
                    return 'Password must contain one uppercase word';
                  }
        
                  if (!lowerCasePattern.test(value)) {
                    return 'Password must contain one lowercase word';
                  }
        
                  if (!numberPattern.test(value)) {
                    return 'Password must contain one number';
                  }
        
                  if (!specialCharacterPattern.test(value)) {
                    return 'Password must contain one special character';
                  }
        
                  return true;
                },
                confirmPassword: value => {
                  if (value !== this.password) {
                    return 'Must match with password';
                  }
        
                  return true;
                }
            }
        }
    }
}