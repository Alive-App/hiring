import { AppStore } from "../store";

const useForm = (callback) => {
  const handleChange = (e) => {
    AppStore.update((state) => {
      state[e.target.name] = e.target.value;
    });
  };

  return [handleChange];
};

export default useForm;
