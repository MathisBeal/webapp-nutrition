export const isNavVisible = ref(true);

export const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};
