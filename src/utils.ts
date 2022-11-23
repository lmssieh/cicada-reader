
export function getText(selector: string, d = document) {
  const ele = d.querySelector(selector);

  if (!ele) {
    throw new Error(`couldn't get content of ${selector}`);
  }

  const clonedDoc = ele.cloneNode(true);

  // const { textContent } = new Readability(clonedDoc, {
  //   debug: true,
  // }).parse();

  return (clonedDoc as HTMLElement).innerHTML;
}

export function getChapters(HTML: HTMLCollection, extractor: any) {
  const chaptersArr: any[] = [];
  const titles = Array.from(HTML).forEach(ele => {
    const chapterObj = extractor(ele)
    chaptersArr.push(chapterObj)
  });
  return chaptersArr
}

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
