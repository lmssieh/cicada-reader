interface website {
  name: string; // location.host
  prev: () => Link;
  next: () => Link;
  chapters: () => Promise<any>;
  content: contentType;
}
interface websitesType {
  [url: string]: website
}
interface contentType {
  title: () => string;
  body: () => string;
}

interface Link {
  name: string,
  link: string
}

// helper function
const getLink = (name: string, selector: string) => {
  const link = (document.querySelector(selector) as HTMLAnchorElement)?.href;
  return {
    name,
    link: link,
  }
}

function getChapters(HTML: HTMLCollection, extractor: any) {
  const chaptersArr = [];
  const titles = Array.from(HTML).forEach(ele => {
    const chapterObj = extractor(ele)
    chaptersArr.push(chapterObj)
  });
  return chaptersArr
}

export const awaitForEle = (selector: string) => {
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


export const websites: websitesType = {
  'novelfull.com': {
    name: 'box novel',
    prev: () => getLink('prev', '#prev_chap'),
    next: () => getLink('next', '#next_chap'),
    chapters: async () => {
      (document.querySelector('button.chapter_jump') as HTMLButtonElement)?.click();
      await awaitForEle("#chapter-nav-top select");
      const chaptersEle = document.querySelector("#chapter-nav-top select")?.children;
      return getChapters(chaptersEle, (ele: HTMLElement) => {
        return {
          title: ele.textContent,
          url: (ele as HTMLSelectElement).value
        }
      })
    },
    content: {
      title: () => document.querySelector("#chapter-content strong")?.textContent,
      body: () => document.querySelector("#chapter-content")?.textContent,
    }
  },
}