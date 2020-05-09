export default {
  methods: {
    processSuccessResponse(message) {
      alert(message);
    },
    processErrorResponse(response) {
      const status = response.status;

      if (status === 500) {
        console.log(response.data);
        return;
      }

      if (status === 400) {
        alert(response.data);
      }
    }
  }
};
