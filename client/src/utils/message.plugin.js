export default {
  install (Vue) {
    Vue.prototype.$message = text => {
      M.toast({html: text});
    };

    Vue.prototype.$error = text => {
      M.toast({html: `[Ошибка]: ${text}`});
    };
  },
};