export default {
  computed: {
    showTransferOnTechnology(){
      if (this.$store.getters.getMainInfo.clients_tab.clients_no_bo) {
        return true;
      }
      else{
        return false;
      }
    }
  }
};