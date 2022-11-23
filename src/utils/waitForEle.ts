export function awaitForEle(selector: string) {
  return new Promise((res) => {
    if (document.querySelector(selector)) {
      console.log('yay')
      res(selector);
    }

    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        console.log('found it')
        res(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, config)
  })
}
