import { shallowRef, unref } from "vue"

export function useDepromosify(promise: Promise<any>) {
  const temp = shallowRef({})

  unref(promise)
    .then(res => temp.value = res)
    .catch(console.error)


  return temp;
}