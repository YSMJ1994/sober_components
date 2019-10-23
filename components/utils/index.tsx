export function listenAndCallback(
  listener: (...args: any) => boolean,
  callback: (...args: any) => any
) {
  if (listener()) {
    callback();
  } else {
    setTimeout(() => {
      listenAndCallback(listener, callback);
    }, 20);
  }
}

export default {
  listenAndCallback
};
